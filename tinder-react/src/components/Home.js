import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    console.log(`handling submit: ${data}`);
    this.props.submit(data);
  }

  render() {
    return (
      <div className="app-container">
        <h1>Tinder: but simpler</h1>
        <h3>Login here</h3>
        <UserForm submit={this.onSubmit} />
        <p>
          Don't have an account?<Link to="/register">
            <button>Sign up!</button>
          </Link>
        </p>
        <br />
      </div>
    );
  }
}
