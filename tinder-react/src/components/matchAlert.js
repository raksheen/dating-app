// import { Link } from "react-router-dom";
import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import "../App.css";

// import TokenService from "../services/TokenService";

export default class itsAMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.itsAMatch = this.itsAMatch.bind(this);
  }

  itsAMatch() {
    this.props.matchAlert();
  }

  render() {
    return (
      <div>
        <h1>It's a match! Thank goodness your're settling for each other!</h1>
      </div>
    );
  }
}
