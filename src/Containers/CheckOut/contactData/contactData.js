import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./contactData.module.css";
import instance from "../../../axios-orders";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../Components/UI/Input/Input";

class ContactData extends Component {
  state = {
    Ingridents: null,
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
    Loading: false,
    touched: false
  };
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.

  componentWillMount() {
    this.setState({ Ingridents: this.props.Ingridents });
  }
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
    console.log(temp);
    this.setState({ orderForm: temp });
  };

  orderHandler = event => {
    event.preventDefault();
    const formobj = {};
    for (let key in this.state.orderForm) {
      formobj[key] = this.state.orderForm[key].value;
    }

    this.setState({ Loading: true });
    const data = {
      ingridents: this.state.Ingridents,
      totalPrice: this.props.Price,
      customerDetails: formobj
    };
    instance
      .post("/sample.json", data)
      .then(response => {
        this.setState({ Loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ Loading: false }));
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

    const spinnerOrForm = !this.state.Loading ? (
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
          <Button
            btnType="Success"
            clicked={this.orderHandler}
            disabled={!disablingButton}
          >
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
