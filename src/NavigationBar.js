import './App.css';
import * as React from "react";
import {Link, NavLink} from "react-router-dom";
import Cookies from "universal-cookie";

class NavigationBar extends React.Component {
    state = {
        links: [{title: "My messages", path: "/My-messages"}, {title: "Send a message", path: "/SendMessage"}]
    }

    logout = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div>
                    Navigation Bar
                </div>
                <ul>
                    {
                        this.state.links.map(link => {
                            return (
                                <NavLink to={link.path} className={"link"} activeClassName={"active"}>
                                    <li>
                                        {link.title}
                                    </li>
                                </NavLink>
                            )
                        })
                    }
                    <NavLink to={"/"} className={"link"} activeClassName={"active"}>
                        <li onClick={this.logout}>
                            Logout
                        </li>
                    </NavLink>
                </ul>
            </div>
        )
    }
}
export default NavigationBar;
