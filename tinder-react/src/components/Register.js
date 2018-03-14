import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      username: "",
      gender: "",
      city: "",
      tagline: "",
      about_me: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.submit(this.state);
    this.props.onSubmit();
    this.props.history.push("/account");
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="signup">
        <form onSubmit={this.handleSubmit}>
          <h1>Sign up to create an account</h1>
          <label>
            Name:
            <input
              defaultValue=""
              type="text"
              name="username"
              placeholder="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              defaultValue=""
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              defaultValue=""
              type="text"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <br />
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              placeholder="gender"
              defaultValue=""
              onChange={this.handleChange}
              value={this.state.gender}
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="text"
              name="age"
              placeholder="age"
              defaultValue=""
              onChange={this.handleChange}
              value={this.state.age}
            />
          </label>
          <br />
          <label>
            Profile Picture:
            <input
              type="text"
              name="profile_pic"
              placeholder="link to image"
              defaultValue=""
              onChange={this.handleChange}
              value={this.state.profile_pic}
            />
          </label>
          <br />
          <label>
            City:
            <input
              type="text"
              name="city"
              placeholder="city"
              defaultValue=""
              onChange={this.handleChange}
              value={this.state.city}
            />
          </label>
          <br />
          <label>
            About Me:
            <input
              type="text"
              name="about_me"
              placeholder="write something to share"
              defaultValue=""
              onChange={this.handleChange}
              value={this.state.tagline}
            />
          </label>
          <br />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
        <p>
          <Link to="/">
            <button>Home</button>
          </Link>
        </p>
      </div>
    );
  }
}
