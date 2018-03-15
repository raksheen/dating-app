// import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import TokenService from "../services/TokenService";

class DisplayProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.routeToResults = this.routeToResults.bind(this);
    this.swipeLeft = this.swipeLeft.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
    this.itsAMatch = this.itsAMatch.bind(this);
  }

  // componentDidMount() {
  //   this.itsAMatch();
  //   console.log("componentDidMount: it's a match", this.state);
  // }

  routeToResults() {
    this.props.history.push("/profiles");
  }

  swipeLeft() {
    this.props.friendOptions();
  }

  swipeRight(friend) {
    console.log("swipeRight test", friend);
    this.props.likePerson(friend);
  }

  itsAMatch(match) {
    this.props.match();
    console.log("match logged", match);
  }

  render() {
    console.log("display profiles:", this.props.other_users);
    if (
      this.props.logged === true &&
      this.props.user &&
      this.props.other_users
    ) {
      return (
        <div>
          <div>
            <h2>Displays Profiles of Potentials</h2>
            <img src={this.props.other_users.profile_pic} />
            <h3>{this.props.other_users.username}</h3>
            <h4>{this.props.other_users.age}</h4>
            <h5>{this.props.other_users.tagline}</h5>
          </div>
          <div className="swipe">
            <button onClick={this.swipeLeft}>I'd rather be single</button>
            <button onClick={this.swipeRight}>Put a ring on it</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="app-container">
          <h2>You need to login to see this page</h2>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      );
    }
  }
}

export default DisplayProfiles;
