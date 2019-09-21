import React, { Component, Suspense } from "react";
import Layout from "../src/hoc/Layout/Layout";
import Burger from "./Containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Checkout from "./Containers/CheckOut/Checkout";
import Logout from "./Containers/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

const Myorders = React.lazy(() => {
  return import("./Containers/Myorders/Myorders");
});
const Auth = React.lazy(() => {
  return import("./Containers/Auth/Auth");
});

class App extends Component {
  state = {};

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentDidMount() {
    this.props.isTokenPresentInLocal();
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route
                path="/signin"
                render={() => {
                  return (
                    <Suspense fallback={<div>Loading...</div>}>
                      <Auth />
                    </Suspense>
                  );
                }}
              />
              <Route path="/checkout" component={Checkout} />
              <Route
                path="/orders"
                render={() => {
                  return (
                    <Suspense fallback={<div>Loading...</div>}>
                      <Myorders />
                    </Suspense>
                  );
                }}
              />
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
