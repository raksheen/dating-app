import React, { Component } from "react";

export default class UserForm extends Component {
  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // preventDefault and lift state back up to the parent
  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
  }

  // update form state
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          UserName
          <input
            type="text"
            name="username"
            defaultValue=""
            placeholder="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            defaultValue=""
            placeholder="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        </label>
        <br />
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
    );
  }
}
