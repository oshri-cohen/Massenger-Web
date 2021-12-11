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
                if (response.data == "username") {
                    this.setState({
                        showError:"The user does not exist "
                    })
                }else {
                    if (response.data == "password") {
                        this.setState({
                            showError:"The password is incorrect"
                        })
                    } else {
                        if(response.data == "block"){
                            this.setState({
                                showError:"This user that call - ' "+ this.state.username +" ', was block after more then 5 uncorrected attempts , Please contact your system administrator"
                            })
                        }else {
                            const cookies = new Cookies();
                            cookies.set("logged_in", response.data);
                            window.location.reload();
                        }
                    }
                }
            })
    }



    render() {
        return (
            <div >
                <div className={"title"}>
                    Enter your login credentials
                </div>
                <input className={"button"}
                    onChange={this.onUsernameChange}
                    value={this.state.username}
                    placeholder={"Enter username"}
                />
                <input className={"button"}
                    onChange={this.onPasswordChange}
                    value={this.state.password}
                    placeholder={"Enter password"}
                />
                <button className={"button"} onClick={this.login}>Login</button>
                <div className={"showEror"}>
                    {
                        this.state.showError
                    }
                </div>

                <div>
                    <NavLink to={"/signUp"} className={"link"} activeClassName={"active"}>
                        <button className={"button"} >Go to signUp</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}
export default LoginPage;
