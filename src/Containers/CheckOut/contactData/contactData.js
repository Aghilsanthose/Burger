import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./contactData.module.css";
import instance from "../../../axios-orders";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";

class ContactData extends Component {
  state = {
    Ingridents: null,
    name: "",
    email: "",
    address: {
      street: "",
      postalcode: ""
    },
    Loading: false
  };
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    this.setState({ Ingridents: this.props.Ingridents });
  }

  orderHandler = event => {
    event.preventDefault();
    this.setState({ Loading: true });
    const data = {
      ingridents: this.state.Ingridents,
      totalPrice: this.props.Price,
      customerName: {
        Name: "Aghil",
        Address: "XXX"
      },
      deliveryMethod: "Fastest"
    };
    //console.log("In Continue Handler");
    instance
      .post("/sample.json", data)
      .then(response => {
        this.setState({ Loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ Loading: false }));
  };

  render() {
    const spinnerOrForm = !this.state.Loading ? (
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Name"
          />
          <input
            className={classes.Input}
            type="text"
            name="postalcode"
            placeholder="Postalcode"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            Order
          </Button>
        </form>
      </div>
    ) : (
      <Spinner />
    );

    return <React.Fragment>{spinnerOrForm}</React.Fragment>;
  }
}

export default withRouter(ContactData);
