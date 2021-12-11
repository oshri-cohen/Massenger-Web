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
        showMessage:"",
        usernameExists: false,
        value1:""
    }

    changeName = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        }, () => {
            axios.get("http://localhost:8989/checkIfUserExistByUsername",{
                params:{
                    username : this.state.username
                }
            })
                .then((response)=>{
                    this.setState({
                        usernameExists: response.data
                    });
                })

        });
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

    inputValue =()=>{
        return (this.state.title != '' && this.state.contentMessage != '')
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



    render() {
        return (
            <div>
                <div className={"details"}>
                    fill the form :
                </div>
                <input className={"button"}
                    onChange={this.changeName}
                    value={this.state.username}
                    placeholder={"Enter username"}
                />
                <div>
                </div>
                <input className={"button"}
                    onChange={this.changeTitle}
                    value={this.state.title}
                    placeholder={"Title"}
                />
                <div>
                </div>
                <input className={"button"}
                    onChange={this.changeContent}
                    value={this.state.contentMessage}
                    placeholder={"content message"}
                />
                <div>
                </div>
                <button className={"button"} onClick={this.sendMessage} disabled={!(this.state.usernameExists && this.inputValue())}>send message</button>
                <div className={"details"}>
                    {this.state.showMessage}
                </div>
            </div>
        )
    }
}
export default SendMessage;
