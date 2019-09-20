import React, { Component } from "react";
import Order from "../../Components/Order/order";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withError from "../../hoc/WithError/withError";
import { connect } from "react-redux";

class Myorder extends Component {
  state = {
    orders: [],
    loading: true,
    userId: null,
    token: null
  };

  fetchingOrderData = () => {
    const queryParams =
      "?auth=" +
      this.props.token +
      '&orderBy="userId"&equalTo="' +
      this.props.userId;

    axios
      .get(
        "https://reactapp-e2c26.firebaseio.com/sample.json" + queryParams + '"'
      )
      .then(response => {
        const orders = [];
        for (let i in response.data) {
          orders.push(response.data[i]);
        }
        this.setState({ orders: orders, loading: false });
      })
      .catch(err => this.setState({ loading: false }));
  };
  componentDidMount() {
    console.log("In did mount", this.props.userId, this.props.token);
    this.fetchingOrderData();
  }
  componentDidUpdate() {
    if (
      this.props.userId !== this.setState.userId &&
      this.props.token !== this.state.token
    ) {
      console.log("In did update", this.props.userId, this.props.token);
      this.fetchingOrderData();
      this.setState({ userId: this.props.userId, token: this.props.token });
    }
  }
  render() {
    let listofOrders = <Spinner />;

    if (!this.state.loading) {
      listofOrders = this.state.orders.map((order, index) => {
        return <Order key={index} order={order} />;
      });
    }

    return <React.Fragment>{listofOrders}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDisptachToProps = disptach => {};

export default connect(mapStateToProps)(Myorder);
