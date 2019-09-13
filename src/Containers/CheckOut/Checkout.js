import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./contactData/contactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutcontinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutcancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <React.Fragment>
        <CheckoutSummary
          checkoutcontinue={this.checkoutcontinueHandler}
          checkoutcancel={this.checkoutcancelHandler}
          Ingridents={this.props.Ingridents}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    Ingridents: state.Ingridents,
    Price: state.TotalPrice,
    purchasable: state.purchasable
  };
};

export default connect(mapStateToProps)(Checkout);
