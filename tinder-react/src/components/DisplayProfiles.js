// import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import TokenService from "../services/TokenService";

// import Login from './Login';
// import Register from './Register';
// import Header from './Header';

class DisplayProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.routeToResults = this.routeToResults.bind(this);
    // this.notInterested = this.notInterested.bind(this);
    this.interested = this.interested.bind(this);
  }

  routeToResults() {
    this.props.history.push("/profiles");
  }

  // notInterested() {
  //   axios("http://localhost:3000/friendNo", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${TokenService.read()}`
  //     }
  //   })
  //     .then(resp => {
  //       console.log("all users", resp);
  //       this.setState({
  //         all_users: resp.data
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }

  interested() {}

  render() {
    console.log(this.props.other_users);
    // const profiles = this.props.profiles;
    // const resultsList = results.hits.map(profileObject => {
    //   const userInfo = profileObject.users;
    if (
      this.props.logged === true &&
      this.props.user &&
      this.props.other_users
    ) {
      return (
        <div>
          <div>
            Displays Profiles of Potentials
            <img src={this.props.other_users.profile_pic} />
            <h3>{this.props.other_users.username}</h3>
            <h4>{this.props.other_users.age}</h4>
            <h5>{this.props.other_users.tagline}</h5>
          </div>
          <div className="swipe">
            <button onClick={this.props.notInterested}>
              I'd rather be single
            </button>
            <button onClick={this.interested}>Put a ring on it</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="app-container">
          <h2>You need to login to see this page</h2>
          <Link to="/">
            <button>Login/Back to Home</button>
          </Link>
        </div>
      );
    }
  }
}

export default DisplayProfiles;
