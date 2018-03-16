import React, { Component } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import "../App.css";

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.logout = this.logout.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.showFirstProfile = this.showFirstProfile.bind(this);
  }

  // componentDidMount() {
  //   this.props.checkLogin();
  // }
  logout() {
    this.props.logout();
    this.props.history.push("/");
  }

  editProfile() {
    this.setState(prevState => {
      const nextState = { ...prevState, editing: !prevState.editing };
      return nextState;
    });
  }

  showFirstProfile() {
    this.props.friendOptions();
  }

  render() {
    console.log("help me: this.props.user", this.props.user);
    let checkProfileEdit = null;
    if (this.state.editing) {
      checkProfileEdit = (
        <Profile submit={this.props.change} user={this.props.user} />
      );
    }

    console.log("check: am I logged in?", this.props.logged);
    console.log("check: this.props?", this.props.user);

    if (this.props.logged === true && this.props.user) {
      return (
        <div className="app-container">
          <h1>Hi there, {this.props.user.username}!</h1>
          <br />
          <img src={this.props.user.profile_pic} />
          <h2>Age: {this.props.user.age}</h2>
          <h2>Gender: {this.props.user.gender}</h2>
          <h3>City:{this.props.user.city} </h3>
          <h2>About Me</h2>
          <h3>{this.props.user.tagline}</h3>
          <button onClick={this.editProfile}>Edit About Me</button>
          {checkProfileEdit}
          <button onClick={this.logout}>Logout</button>
          <br />
          <Link to="/">
            <button>Home</button>
          </Link>
          <br />
          <br />
          <div className="find-love">
            <Link to="/DisplayProfiles">
              <button className="love-button" onClick={this.showFirstProfile}>
                Find Love
              </button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="app-container">
          <h2>You need to login to see this page</h2>
          <Link to="/">
            <button>Login</button>
          </Link>
          <Link to="/Register">
            <button>Create an Account</button>
          </Link>
        </div>
      );
    }
  }
}
