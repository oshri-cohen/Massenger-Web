import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

class SendMessage extends React.Component {
    state ={
        username : '',
        title : '' ,
        contentMessage : '',

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
        alert(this.state.contentMessage)
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
            })

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
                <button onClick={this.sendMessage}>send message</button>


            </div>
        )
    }
}
export default SendMessage;
