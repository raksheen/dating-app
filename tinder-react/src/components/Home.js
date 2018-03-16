import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import TokenService from "../services/TokenService";
import "../App.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_users: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    // this.friendOptions = this.friendOptions.bind(this);
    // this.friendsExceptMe = this.friendsExceptMe.bind(this);
  }

  onSubmit(data) {
    console.log(`handling submit: ${data}`);
    this.props.submit(data);
    this.props.history.push("/account");
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
      <div className="home-app-container">
        <div className="login-box">
          <h3 className="sign-in-button">Sign In</h3>
          <UserForm submit={this.onSubmit} />
          <br />
          <p>
            Don't have an account?<Link to="/register">
              <br />
              <button>Create account</button>
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
