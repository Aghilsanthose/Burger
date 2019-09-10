import React, { Component } from "react";
import Button from "../UI/Button/Button";

class OrderSummary extends Component {
  state = {};

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUpdate() {
    // console.log("[In OrderSummary] willUpdate ");
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log("In OrderSummary shouldUpdate", this.props);
  //   }

  render() {
    // console.log("In OrderSummary render");
    const orderSummary = Object.keys(this.props.ingridents).map(keys => {
      return (
        <li key={keys}>
          <span style={{ textTransform: "capitalize" }}>{keys}</span>:{" "}
          {this.props.ingridents[keys]}
        </li>
      );
    });

    return (
      <div>
        <p>Order Summary :</p>
        <ul>{orderSummary}</ul>
        <p>
          <strong>Total Price : {this.props.Price.toFixed()}</strong>
        </p>
        <p>Continue to Check out?</p>
        <Button btnType="Danger" clicked={this.props.cancelPurchase}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.continuePurchase}>
          Continue
        </Button>
      </div>
    );
  }
}

export default OrderSummary;
