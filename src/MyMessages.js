import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";

class MyMessages extends React.Component {
    state ={
        token:"",
        message:[]
    }
    componentDidMount() {
        this.getAllMessage()
    }

    getAllMessage =()=>{
        const cookies = new Cookies();
        axios.get("http://localhost:8989/MyMessages",{
            params:{
                token:cookies.get("logged_in")
            }
        })
            .then((response)=>{
                /*const myMessages = response.data.sort((a,b) => a.sendTime > b.sendTime);*/
                this.setState({
                    message: response.data
                })
            })
    }

    deleteMessage=(messageId)=>{
        axios.get("http://localhost:8989/deleteMessages",{
            params:{
                id:messageId
            }
        })
            .then((response)=>{
                this.getAllMessage()
            })
    }


    render() {
        return (
            <div>
                {
                    this.state.message.map(message1 =>{
                        return(
                            <div>
                                <div>
                                    {message1.title}
                                </div>
                                <div>
                                    {message1.body}
                                </div>
                                <div>
                                    {message1.senderName}
                                </div>
                                <div>
                                    {message1.readTime == null ? "no read" : "read"}
                                </div>
                                <button onClick={() => this.deleteMessage(message1.messageId)}>delete message</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


export default MyMessages;
