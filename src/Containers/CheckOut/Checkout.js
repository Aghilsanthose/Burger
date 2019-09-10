import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./contactData/contactData";

class Checkout extends Component {
  state = {
    Ingridents: null,
    Price: 0
  };

  checkoutcontinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutcancelHandler = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    //console.log("[DidMount]");
    const temp = new URLSearchParams(this.props.location.search).entries();
    const Ingridents = {};
    let price = 0;
    for (let i of temp) {
      if (i[0] !== "Price") {
        Ingridents[i[0].trim()] = +i[1].trim();
      } else {
        price = i[1];
      }
    }
    this.setState({ Ingridents: Ingridents, Price: price });
  }

  render() {
    //console.log("In render", this.state.Ingridents);
    return (
      <React.Fragment>
        <CheckoutSummary
          checkoutcontinue={this.checkoutcontinueHandler}
          checkoutcancel={this.checkoutcancelHandler}
          Ingridents={this.state.Ingridents}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => (
            <ContactData
              Ingridents={this.state.Ingridents}
              Price={this.state.Price}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default Checkout;
