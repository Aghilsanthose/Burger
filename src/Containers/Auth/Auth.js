import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      passWord: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };
  validation = (rules, value) => {
    let isValid = true;
    if (rules.isEmail) {
      const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    return isValid;
  };

  onChangeHandler = (event, id) => {
    const copyingTop = {
      ...this.state.controls
    };
    const copyingInside = {
      ...this.state.controls[id]
    };
    copyingInside.value = event.target.value;
    copyingInside.valid = this.validation(
      this.state.controls[id].validation,
      event.target.value
    );
    copyingInside.touched = true;
    copyingTop[id] = copyingInside;
    this.setState({ controls: copyingTop });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.passWord.value,
      this.state.isSignUp
    );
  };

  authSwtichModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    let formElements = [];
    for (let formElementKey in this.state.controls) {
      formElements.push({
        id: formElementKey,
        config: this.state.controls[formElementKey]
      });
    }

    const formElementArr = formElements.map(formElement => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          value={formElement.config.value}
          elementConfig={formElement.config.elementConfig}
          onChangeHandler={event => this.onChangeHandler(event, formElement.id)}
          validation={formElement.config.validation}
          valid={formElement.config.valid}
          touched={formElement.config.touched}
        />
      );
    });

    let spinnerOrForm = (
      <div className={classes.Auth}>
        {this.props.isAuthenticated ? <Redirect to="/"></Redirect> : null}
        <form onSubmit={this.formSubmitHandler}>
          {formElementArr}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button clicked={this.authSwtichModeHandler} btnType="Danger">
          Swtich to {this.state.isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    );

    if (this.props.error) {
      spinnerOrForm = (
        <div className={classes.Auth}>
          <h1>{this.props.error}</h1>;
          <form onSubmit={this.formSubmitHandler}>
            {formElementArr}
            <Button clicked={this.redirectionHandler} btnType="Success">
              Submit
            </Button>
          </form>
          <Button clicked={this.authSwtichModeHandler} btnType="Danger">
            Swtich to {this.state.isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      );
    }

    return this.props.loading ? <Spinner /> : spinnerOrForm;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    redirectURL: state.auth.redirectURL
  };
};

const mapDisptachToProps = dispatch => {
  return {
    onAuth: (email, passWord, isSignUp) =>
      dispatch(actions.auth(email, passWord, isSignUp))
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Auth);
