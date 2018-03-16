import React from "react";
import Modal from "react-responsive-modal";
import "../App.css";

// import "./custom-animation.css";

export default class MatchModal extends React.Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div className="example">
        <h4>Congrats! It's a match! </h4>
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{" "}
        <Modal
          open={open}
          onClose={this.onCloseModal}
          little
          classNames={{
            transitionEnter: "transition-enter",
            transitionEnterActive: "transition-enter-active",
            transitionExit: "transition-exit-active",
            transitionExitActive: "transition-exit-active"
          }}
          animationDuration={1000}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
        </Modal>
      </div>
    );
  }
}
