import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        showError: false,
        response: "11111",
        UserExist: false
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

    signUp = () => {
        axios.get("http://localhost:8989/create-account", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        }).then((respone) =>{
            let success= respone.data;
            if (success) {
                this.setState({
                    UserExist : false
                })
            }
            else{
                this.setState({
                    UserExist : true
                })
            }
        })
    }


    login = () => {
        axios.get("http://localhost:8989/sign-in", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const cookies = new Cookies();
                    cookies.set("logged_in", "tokenabcd");
                    window.location.reload();
                } else {
                    this.setState({
                        showError: true
                    })
                }
            })

    }


    render() {
        return (
            <div>
                this is the login page
                {/*<div>*/}
                {/*    Enter your login credentials*/}
                {/*</div>*/}
                {/*<input*/}
                {/*    onChange={this.onUsernameChange}*/}
                {/*    value={this.state.username}*/}
                {/*    placeholder={"Enter username"}*/}
                {/*/>*/}
                {/*<input*/}
                {/*    onChange={this.onPasswordChange}*/}
                {/*    value={this.state.password}*/}
                {/*    placeholder={"Enter password"}*/}
                {/*/>*/}
                {/*<button onClick={this.login}>Login</button>*/}
                {/*{*/}
                {/*    this.state.showError &&*/}
                {/*    <div>Wrong Password</div>*/}
                {/*}*/}
                {/*<button onClick={this.signUp}>add account</button>*/}
                {/*{*/}
                {/*    this.state.UserExist?*/}
                {/*        <div>the user exist</div>*/}
                {/*        : <div>the user creat</div>*/}
                {/*}*/}
                {/*<div>{this.state.response}</div>*/}

            </div>
        )
    }
}
export default LoginPage;
