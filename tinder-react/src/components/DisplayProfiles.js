// import { Link } from "react-router-dom";
import React, { Component } from "react";
// import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import "../App.css";

// import TokenService from "../services/TokenService";

class DisplayProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.routeToResults = this.routeToResults.bind(this);
    this.swipeLeft = this.swipeLeft.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
    // this.checkForMatch = this.checkForMatch.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  // this.modalHandler = this.modalHandler.bind(this);

  // modalHandler() {
  //   this.setState(prevState => {
  //     prevState.modalOpen = !prevState.modalOpen;
  //     return prevState;
  //   });
  // }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
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

  // checkForMatch() {
  //   if (this.props.model_is_open == true) {
  //   }
  //   this.setState({ model_is_open: true });
  // }

  render() {
    const { open } = this.state;
    console.log("display profiles:", this.props.other_users);
    if (
      this.props.logged === true &&
      this.props.user &&
      this.props.other_users
    ) {
      return (
        <div className="display-profiles">
          <div>
            <h2 className="how-do-you-feel">
              How do you feel about {this.props.other_users.username}?
            </h2>
            <div className="profile-photos">
              <img src={this.props.other_users.profile_pic} />
            </div>
            <h3>
              {this.props.other_users.username}, {this.props.other_users.age}
            </h3>
            <h5>{this.props.other_users.tagline}</h5>
          </div>
          <div className="swipe">
            <button onClick={this.swipeLeft}>
              <div className="swipe-left-button" alt="I'd rather be single">
                I'd rather be single{" "}
              </div>
            </button>

            <button onClick={this.swipeRight}>
              <div className="swipe-right-button" alt="Put a ring on it">
                Put a ring on it
              </div>
            </button>
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

          <Modal open={open} onClose={this.onCloseModal} little>
            <h2>It's a match!</h2>
          </Modal>
        </div>
      );
    }
  }
}

export default DisplayProfiles;
