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
        response:"",
        number: "05",
        regionNumber : "+972",
    }
    CheckLength = () => {
        const checkLengthPassword = this.state.password.length > 5 ? true : false
        return checkLengthPassword
    }

    checkForNumbers =()=>{
        let matches =this.state.password.match(/\d+/g);
        const checkNumber = matches != null ? true : false
        return checkNumber
    }

    checkForUpperCase = ()=> {
        let matchesA = this.state.password.match(/[A-Z]/);
        let matchesB = this.state.password.match(/[a-z]/);
        const checkUpperCase = matchesA != null || matchesB != null ? true : false
        return checkUpperCase
    }

    checkPhone=()=> {
        let checkPhone = false;
        if (this.state.username.length == 10) {
            if ((this.state.username.startsWith(this.state.number)) || (this.state.username.startsWith(this.state.regionNumber))) {
                checkPhone = true
            }
        }
        return checkPhone
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
        if(this.checkForUpperCase() && this.checkForNumbers() && this.CheckLength() && this.checkPhone()) {
            axios.get("http://localhost:8989/create-account", {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
                .then((response) => {
                    if (response.data) {
                        this.setState({
                            showError: "the user create, now go to login in our site!"
                        })
                    } else {
                        this.setState({
                            showError: "the username exist - change your username!"
                        })
                    }
                })
        }else {
            this.setState({
                showError: "It is necessary to comply with the policy"
            })
        }
    }



    render() {
        return (
            <div >
                <div className={"title"}>
                    Enter password and userName to sign-up
                </div>
                <div >
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
                    <button className={"button"} onClick={this.SignUp}>sign-up</button>
                </div>
                <div className={"showEror"}>
                    {this.state.showError}
                </div>
                <div className={"details"}>
                    <ul>
                        <li className={this.checkPhone() ? 'green' : null}>Proper phone number</li>
                        <li className={this.CheckLength() ? 'green' : null}>Password with at least 6 characters</li>
                        <li className={this.checkForNumbers() ? 'green' : null}>At least one digit in the password</li>
                        <li className={this.checkForUpperCase() ? 'green' : null}> At least one letter in the password</li>
                    </ul>
                </div>
                <div>
                    <NavLink to={"/"} className={"link"} activeClassName={"active"}>
                        <button className={"button"}>back to signIn</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}
export default SignUp;

