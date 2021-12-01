import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        showError: false,
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

    login = () => {
        axios.get("http://127.0.0.1:8989/sign-in",{
            params:{
                username:this.state.username,
                password:this.state.password
            }
        })
            .then((response)=>{
                if (response.data && response.data.length >0){
                    const cookies  = new Cookies();
                    cookies.set("logged_in",response.data);
                    window.location.reload();
                }else {
                    this.setState({
                        showError: true
                    })
                }

            })
    }


    render() {
        return (
            <div>
                Enter your login credentials
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
                <button onClick={this.login}>Login</button>
                {
                    this.state.showError &&
                    <div>Wrong Password</div>
                }
                <div>
                    {this.state.response}
                </div>
                <div>
                    <NavLink to={"/signUp"} className={"link"} activeClassName={"active"}>
                        <button >signUp</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}
export default LoginPage;
