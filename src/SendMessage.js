import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

class SendMessage extends React.Component {
    state ={
        username : '',
        title : '' ,
        contentMessage : '',
        chekInput : false,
        showMessage:""
    }
    changeName = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }



    changeTitle = (e) => {
        let title = e.target.value;
        this.setState({
            title: title
        })
    }


    changeContent =(e) => {
        let content = e.target.value;
        this.setState({
            contentMessage: content
        })
    }
    sendMessage = () => {
        const cookies = new Cookies();
        axios.get("http://127.0.0.1:8989/sendMessage",{
            params:{
                username : this.state.username,
                title : this.state.title ,
                content : this.state.contentMessage,
                token: cookies.get("logged_in")
            }
        })
            .then((response)=>{
                if(response.data){
                    this.setState({
                        username :"",
                        title :"",
                        contentMessage:"",
                        showMessage:"the message send!"
                    })
                }else {
                    this.setState({
                        showMessage: "message do not sent"
                    })
                }

            })

    }

    checkSend =()=>{
        let checkIfUserExist = false
        let value1 = this.state.title != '' && this.state.contentMessage != '' ? true:false
        const cookies = new Cookies();
        axios.get("http://localhost:8989/checkIfUserExistByUsername",{
            params:{
                username : this.state.username
            }
        })
            .then((response)=>{
                checkIfUserExist = response.data
            })

        let ch =!(value1 && checkIfUserExist)
        if (checkIfUserExist){
            alert( "user : "+checkIfUserExist)
        }
        if (value1){
            alert("content: "+value1)
        }
        return ch
    }


    render() {
        return (
            <div>
                fill the form :
                <input
                    onChange={this.changeName}
                    value={this.state.username}
                    placeholder={"Enter username"}
                />
                <input
                    onChange={this.changeTitle}
                    value={this.state.title}
                    placeholder={"Title"}
                />
                <input
                    onChange={this.changeContent}
                    value={this.state.contentMessage}
                    placeholder={"content message"}
                />
                <button onClick={this.sendMessage} disabled={false}>send message</button>
                <div>
                    {this.state.showMessage}
                </div>
            </div>
        )
    }
}
export default SendMessage;
