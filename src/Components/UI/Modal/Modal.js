import React, { Component } from "react";
import BackDrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

class Modal extends Component {
  state = {};

  componentWillUpdate(nextProps, nextState) {
    console.log("[Inside Modal] willUpdate");
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log("Inside Modal ShouldUpdate");
  //   }

  render() {
    console.log("Inside Modal", this.props.show);
    return (
      <React.Fragment>
        <BackDrop show={this.props.show} clicked={this.props.cancelPurchase} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
