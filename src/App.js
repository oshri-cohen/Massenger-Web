import './App.css';
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import MyMessages from "./MyMessages";
import NavigationBar from "./NavigationBar";
import LoginPage from "./LoginPage";
import Cookies from "universal-cookie";
import {Route} from "react-router";
import SignUp from "./SignUp";
import SendMessage from "./SendMessage";

class App extends React.Component {

  state = {
    isLoggedIn: false
  }

  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("logged_in") && cookies.get("logged_in").length >0) {
      this.setState({
        isLoggedIn: true
      })
    }
  }


  render() {
    return (
        <div>
          <BrowserRouter>
            {
              this.state.isLoggedIn ?
                  <div>
                    <NavigationBar/>
                    <Route path={"/My-messages"} component={MyMessages}/>
                    <Route path={"/SendMessage"} component={SendMessage}/>
                  </div>
                  :
                  <div>
                    <Route path={"/"} component={LoginPage} exact={true}/>
                    <Route path={"/signUp"} component={SignUp}/>
                  </div>
            }
          </BrowserRouter>
        </div>
    )
  }

}

export default App;
