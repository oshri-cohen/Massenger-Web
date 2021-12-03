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
        checkPhone : false,
        checkLengthPassword : false,
        checkUpperCase : false,
        checkNumber :false

    }
    CheckLength = () => {
        this.setState({
            checkLengthPassword : this.state.password.length > 5 ? true : false
        })
    }

    checkForNumbers =()=>{
        let matches =this.state.password.match(/\d+/g);
        this.setState({
            checkNumber:matches != null ? true : false
        })

    }

    checkForUpperCase = ()=> {
        let matchesA = this.state.password.match(/[A-Z]/);
        let matchesB = this.state.password.match(/[a-z]/);
        this.setState({
            checkUpperCase: matchesA != null || matchesB != null ? true : false
        })
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
        this.checkDetails()
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
        this.checkDetails()
    }

    SignUp = () => {
        if(this.state.checkUpperCase && this.state.checkLengthPassword &&this.state.checkNumber && this.state.checkPhone) {
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
    checkDetails = () => {
        this.CheckLength()
        this.checkForNumbers()
        this.checkForUpperCase()
        if (this.state.username.length == 10 ){
            if ((this.state.username.startsWith(this.state.number)) ||(this.state.username.startsWith(this.state.regionNumber))) {
                this.setState({
                    checkPhone : true
                })
            }else {
                this.setState({
                    checkPhone : false
                })
            }
        }
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
                    {this.state.showError}
                </div>
                <div>
                    <ul>
                        <li className={this.state.checkPhone ? 'green' : null}>Proper phone number</li>
                        <li className={this.state.checkLengthPassword ? 'green' : null}>Password with at least 6 characters</li>
                        <li className={this.state.checkNumber ? 'green' : null}>At least one digit in the password</li>
                        <li className={this.state.checkUpperCase ? 'green' : null}> At least one letter in the password</li>
                    </ul>
                </div>
                <div>
                    <NavLink to={"/"} className={"link"} activeClassName={"active"}>
                        <button >back to signIn</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}
export default SignUp;

