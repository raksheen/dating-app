import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import TokenService from "../services/TokenService";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_users: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.friendOptions = this.friendOptions.bind(this);
    // this.friendsExceptMe = this.friendsExceptMe.bind(this);
  }

  onSubmit(data) {
    console.log(`handling submit: ${data}`);
    this.props.submit(data);
  }

  friendOptions() {
    axios("http://localhost:3000/friends", {
      method: "GET"
    })
      .then(resp => {
        console.log("all users", resp),
          this.setState({
            all_users: resp
          });
      })
      .catch(err => console.log(err));
  }
  // friendsExceptMe() {
  //   console.log("friendsExceptMe", this.props);
  //   const isLoggedIn = this.props.logged;
  //   const id = this.props.user.id
  //   // const user_id = this.props.data.id;
  //   if (isLoggedIn === true) {
  //     return (
  //     {this.state.users}
  //     )
  //   }
  // }
  render() {
    return (
      <div className="app-container">
        <h1 className="simpler-name">simpler</h1>
        <div className="login-box">
          <h3>Login: home.js</h3>
          <UserForm submit={this.onSubmit} />
          <button onClick={this.friendOptions}>all users except me </button>
          <br />
          <p>
            Don't have an account?<Link to="/register">
              <br />
              <button>Sign up!</button>
            </Link>
          </p>
        </div>
        <p>
          <button
            onClick={() => {
              axios("http://localhost:3000/friends", {
                headers: {
                  Authorization: `Bearer ${TokenService.read()}`
                }
              }).then(res => console.log("response from friends ", res.data));
            }}
          >
            Get friends
          </button>
        </p>
        <br />
      </div>
    );
  }
}
