import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./contactData.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import { withRouter, Redirect } from "react-router-dom";
import Input from "../../../Components/UI/Input/Input";
import { connect } from "react-redux";
import {
  storingDataOnServer,
  startPurchasing
} from "../../../store/actions/index";
import axios from "../../../axios-orders";
import withError from "../../../hoc/WithError/withError";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalcode: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Your Postalcode"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {}
      }
    },
    touched: false
  };
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.

  validationHandler = (value, rules) => {
    let isValid = false;
    if (Object.keys(rules).length === 0) {
      isValid = true;
    }

    if (rules.required) {
      isValid = value.trim() !== "";
    }
    return isValid;
  };
  onChangeHandler = (id, event) => {
    const temp = {
      ...this.state.orderForm
    };
    const elementInTemp = {
      ...this.state.orderForm[id]
    };
    elementInTemp.value = event.target.value;
    elementInTemp.valid = this.validationHandler(
      event.target.value,
      elementInTemp.validation
    );
    elementInTemp.touched = true;
    temp[id] = elementInTemp;
    //console.log(temp);
    this.setState({ orderForm: temp });
  };

  orderHandler = event => {
    event.preventDefault();
    const formobj = {};
    for (let key in this.state.orderForm) {
      formobj[key] = this.state.orderForm[key].value;
    }

    const data = {
      ingridents: this.props.Ingridents,
      totalPrice: this.props.Price,
      customerDetails: formobj,
      userId: this.props.userId
    };
    this.props.onStoringDataToServer(data, this.props.token);
  };

  render() {
    let formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        element: this.state.orderForm[key]
      });
    }

    let disablingButton =
      formElements.filter(element => element.element.valid === false).length ===
      0;

    const spinnerOrForm = !this.props.Loading ? (
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        <form onSubmit={this.orderHandler}>
          {formElements.map(element => {
            return (
              <Input
                key={element.id}
                onChangeHandler={event => {
                  return this.onChangeHandler(element.id, event);
                }}
                elementType={element.element.elementType}
                elementConfig={element.element.elementConfig}
                validation={element.element.validation}
                valid={element.element.valid}
                touched={element.element.touched}
              />
            );
          })}
          <Button btnType="Success" disabled={!disablingButton}>
            Order
          </Button>
        </form>
      </div>
    ) : (
      <Spinner />
    );

    return (
      <React.Fragment>
        {this.props.redirect ? <Redirect to="/" /> : spinnerOrForm}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    Ingridents: state.burgerBuilder.Ingridents,
    Price: state.burgerBuilder.TotalPrice,
    purchasable: state.burgerBuilder.purchasable,
    redirect: state.order.redirect,
    Loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDisptachToProps = dispatch => {
  return {
    onStoringDataToServer: (data, token) =>
      dispatch(storingDataOnServer(data, token)),
    loading: () => dispatch(startPurchasing())
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withRouter(withError(ContactData, axios)));
