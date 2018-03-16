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
import MatchModal from "./components/MatchModal";

class App extends Component {
  // api call for creating a new user
  // note that TokenService.save with the token is called
  // may also want to setState with the user data and
  // whether or not the user is logged in
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      logged: false,
      users: [],
      other_users: null,
      model_is_open: false
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.friendOptions = this.friendOptions.bind(this);
    this.likePerson = this.likePerson.bind(this);
    this.match = this.match.bind(this);
    // this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
    console.log("in componentDidMount, state: ", this.state);
  }

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
        console.log("haiiiiiiiiiii", resp.data);
        this.setState({
          logged: true,
          user: resp.data
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
  logout() {
    // ev.preventDefault();
    TokenService.destroy();
  }

  // friendOptions() {
  //   axios("http://localhost:3000/friends", {
  //     method: "GET"
  //   })
  //     .then(resp => {
  //       console.log("all users", resp),
  //         this.setState({
  //           all_users: resp
  //         });
  //     })
  //     .catch(err => console.log(err));
  // }

  checkLogin() {
    axios("http://localhost:3000/isLoggedIn", {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`
      }
    })
      .then(resp => {
        console.log("checkLogin", resp);
        this.setState({
          user: resp.data,
          logged: true
        });
      })
      .catch(err => console.log(err));
  }
  //shows ALL users except yourself
  friendOptions() {
    axios("http://localhost:3000/friends", {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`
      }
    })
      .then(resp => {
        console.log("response from friends ", resp.data);
        this.setState({
          other_users: resp.data,
          logged: true
        });
      })
      .catch(err => console.log(err));
  }

  //logging swipes

  likePerson(friend) {
    console.log("likePerson", friend);

    axios("http://localhost:3000/swipedRight", {
      method: "POST",
      data: { friend_id: friend.id },
      headers: {
        Authorization: `Bearer ${TokenService.read()}`
      }
    })
      .then(resp => {
        console.log("is swipe right working?", resp.data);
        // TokenService.save(resp.data.token);
        this.setState({
          logged: true,
          log_likes: resp.data
        });
      })
      .catch(err => console.log(`err: ${err}`));
    this.match();
  }
  //CHECK to see if it's a MATCH
  match() {
    console.log("a match");

    axios("http://localhost:3000/matches", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TokenService.read()}`
      }
    })
      .then(resp => {
        console.log("is Match working?", resp.data);
        // TokenService.save(resp.data.token);
        this.setState({
          logged: true,
          matched: resp.data,
          model_is_open: true
        });
        // this.openModal();
      })
      .catch(err => console.log(`err: ${err}`));
  }

  // openModal() {
  //   return <MatchModal />;
  // }

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
            <button onClick={this.friendOptions.bind(this)}>
              Next Friend Options
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
                <DisplayProfiles
                  {...props}
                  submit={this.login.bind(this)}
                  user={this.state.user}
                  logged={this.state.logged}
                  other_users={this.state.other_users}
                  friendOptions={this.friendOptions}
                  likePerson={this.likePerson}
                  match={this.match}
                  model_is_open={this.state.model_is_open}
                />
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
                  friendOptions={this.friendOptions}
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
