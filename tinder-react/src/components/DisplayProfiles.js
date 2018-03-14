// import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import "../App.css";
// import Login from './Login';
// import Register from './Register';
// import Header from './Header';

class DisplayProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.routeToResults = this.routeToResults.bind(this);
  }

  routeToResults() {
    this.props.history.push("/profiles");
  }

  notInterested() {}

  interested() {}

  render() {
    // const profiles = this.props.profiles;
    // const resultsList = results.hits.map(profileObject => {
    //   const userInfo = profileObject.users;

    return (
      <div>
        <div>
          Displays Profiles of Potentials
          <img src={this.props.profile_pic} />
          <h3>{this.props.username}</h3>
          <h4>{this.props.age}</h4>
          <h5>{this.props.tagline}</h5>
        </div>
        <div className="swipe">
          <button>x</button>
          <button>yes</button>
        </div>
      </div>
    );
  }
}

export default DisplayProfiles;
