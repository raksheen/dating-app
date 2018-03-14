import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import TokenService from "./services/TokenService";
import Account from "./components/Account";
import DisplayProfiles from "./components/DisplayProfiles";

class App extends Component {
  // api call for creating a new user
  // note that TokenService.save with the token is called
  // may also want to setState with the user data and
  // whether or not the user is logged in
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      logged: false,
      users: []
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.updateUser = this.updateUser.bind(this);
    // this.queryUsers = this.queryUsers.bind(this);
  }

  // componentDidMount() {
  //   this.queryUsers();
  //   console.log("in componentDidMount, state: ", this.state);
  // }

  register(data) {
    console.log("register data", data);
    axios("http://localhost:3000/users", {
      method: "POST",
      data
    })
      .then(resp => {
        TokenService.save(resp.data.token);
      })
      .catch(err => console.log(`err: ${err}`));
  }

  // same as above except route is login
  // as above, we are saving the token locally using
  // the TokenService
  login(data) {
    axios("http://localhost:3000/users/login", {
      method: "POST",
      data
    })
      .then(resp => {
        TokenService.save(resp.data.token);
        this.setState({
          logged: true
        });
      })
      .catch(err => console.log(`err: ${err}`));
  }

  updateUser(data) {
    axios(`http://localhost:3000/users/${this.state.user.id}`, {
      method: "PUT",
      data
    })
      .then(resp => {
        TokenService.save(resp.data.token);
        this.setState({ user: resp.data.user });
      })
      .catch(err => console.log(`err: ${err}`));
  }

  // just delete the token
  logout(ev) {
    ev.preventDefault();
    TokenService.destroy();
  }

  // queryUsers() {
  //   axios("http://localhost:3000/users", {
  //     method: "GET"
  //   })
  //     .then(resp => {
  //       this.setState({ users: resp.data.users });
  //       console.log("in queryUsers, users are ", this.state.users);
  //     })
  //     .catch(err => console.log(`err: ${err}`));
  // }

  checkLogin() {
    axios("http://localhost:3000/isLoggedIn", {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`
      }
    })
      .then(resp => {
        console.log("checkLogin", resp);
        this.setState({ user: resp.data.user });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div>
          <p>
            <button onClick={this.checkLogin.bind(this)}>
              Check If Logged In
            </button>
          </p>
          <p>
            <button onClick={this.logout.bind(this)}>Logout</button>
          </p>
        </div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={props => (
                <Home {...props} submit={this.login.bind(this)} />
              )}
            />
            <Route
              exact
              path="/register"
              component={props => (
                <Register {...props} submit={this.register.bind(this)} />
              )}
            />
            <Route
              exact
              path="/login"
              component={props => (
                <Login {...props} submit={this.login.bind(this)} />
              )}
            />
            <Route
              exact
              path="/displayprofiles"
              component={props => (
                <DisplayProfiles {...props} submit={this.login.bind(this)} />
              )}
            />
            <Route
              exact
              path="/account"
              component={props => (
                <Account
                  {...props}
                  user={this.state.user}
                  logged={this.state.logged}
                  logout={this.logout}
                  change={this.updateUser}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
