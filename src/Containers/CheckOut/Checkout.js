import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./contactData/contactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutcontinueHandler = () => {
    console.log("In checkout continue handler");
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutcancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const checkoutSummary = (
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
    const temp = this.props.Ingridents ? checkoutSummary : <Redirect to="/" />;

    return temp;
  }
}

const mapStateToProps = state => {
  return {
    Ingridents: state.burgerBuilder.Ingridents,
    Price: state.burgerBuilder.TotalPrice,
    purchasable: state.burgerBuilder.purchasable
  };
};

export default connect(mapStateToProps)(Checkout);
