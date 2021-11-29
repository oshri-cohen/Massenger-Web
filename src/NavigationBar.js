import './App.css';
import * as React from "react";
import {Link, NavLink} from "react-router-dom";
import Cookies from "universal-cookie";

class NavigationBar extends React.Component {
    state = {
        links: [{title: "Profile", path: "/profile"}, {title: "About", path: "/about"}]
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
                    <li onClick={this.logout}>
                        Logout
                    </li>
                </ul>
            </div>
        )
    }
}
export default NavigationBar;
