import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>I'm Home</div>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <br />
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    );
  }
}
