import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";

const withError = (WrappedComponent, axios) => {
  //console.log("Inside Wrapped initially");
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      //console.log("Will Mount");
      this.reqInterceptors = axios.interceptors.request.use(
        req => {
          //console.log("[Req] Will Mount", req);
          this.setState({ error: null });
          return req;
        },
        err => {
          //console.log("[Req] Err", err);
        }
      );
      this.resInterceptors = axios.interceptors.response.use(
        res => {
          //this.setState({ error: null });
          //console.log("[Res]", res);
          return res;
        },
        error => {
          //console.log("[Res] Err", error);
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptor.request.eject(this.reqInterceptors);
      axios.interceptor.response.eject(this.resInterceptors);
    }

    errorHandler = () => {
      console.log("In Error Handler", this.state.error);
      this.setState({ error: null });
    };
    render() {
      console.log("within Wrapped initially", this.state.error);
      return (
        <React.Fragment>
          <Modal cancelPurchase={this.errorHandler} show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withError;
