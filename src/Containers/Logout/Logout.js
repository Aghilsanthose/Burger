import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Logout extends Component {
  state = {};

  componentDidMount() {
    this.props.loggingOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return { loggingOut: () => dispatch(actions.authLogout()) };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
