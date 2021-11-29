import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        showError: "",
        response:""
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    SignUp = () => {
        axios.get("http://localhost:8989/create-account",{
            params:{
                username:this.state.username,
                password:this.state.password
            }
        })
            .then((response)=>{
                if (response.data ){
                    this.setState({
                        showError: "good"
                    })
                }else {
                    this.setState({
                        showError: "false"
                    })
                }
            })
    }

    render() {
        return (
            <div>
                Enter password and userName to sign-up
                <input
                    onChange={this.onUsernameChange}
                    value={this.state.username}
                    placeholder={"Enter username"}
                />
                <input
                    onChange={this.onPasswordChange}
                    value={this.state.password}
                    placeholder={"Enter password"}
                />
                <button onClick={this.SignUp}>sign-up</button>

                <div>
                    {this.state.response}
                    {this.state.showError}
                </div>
            </div>
        )
    }
}
export default SignUp;