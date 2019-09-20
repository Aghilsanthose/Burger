import React, { Component } from "react";
import Layout from "../src/hoc/Layout/Layout";
import Burger from "./Containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Checkout from "./Containers/CheckOut/Checkout";
import Myorders from "./Containers/Myorders/Myorders";
import Auth from "./Containers/Auth/Auth";
import Logout from "./Containers/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  state = {};

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    console.log("In APP");
    this.props.isTokenPresentInLocal();
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/signin" component={Auth} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Myorders} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={Burger} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isTokenPresentInLocal: () => dispatch(actions.isTokenPresentInLocal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
