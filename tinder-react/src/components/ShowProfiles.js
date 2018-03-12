// import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import "../App.css";
// import Login from './Login';
// import Register from './Register';
// import Header from './Header';

class ShowProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.routeToResults = this.routeToResults.bind(this);
  }

  routeToResults() {
    this.props.history.push("/profiles");
  }

  notInterested(){

  }

  interested(){
    
  }

  render() {
    const profiles = this.props.profiles;
    const resultsList = results.hits.map(profileObject => {
      const userInfo = profileObject.users;

      return (
        <div key={userInfo.xxxx}>
          <img src={userInfo.profile_pic} className="profileImg" />
          <h3 className="profileName">{userInfo.username}</h3>
          <h4 className="profileAge">{userInfo.age}</h4>
          <h5 className="profileTagline">{userInfo.tagline}</h5>
        </div>
        <div className="swipe">
        <button>x</button>
        <button>yes</button>
        </div>
      );
    });
  }
}

export default ShowProfiles;