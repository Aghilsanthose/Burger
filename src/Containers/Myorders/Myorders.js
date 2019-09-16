import React, { Component } from "react";
import Order from "../../Components/Order/order";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withError from "../../hoc/WithError/withError";
import { connect } from "react-redux";

class Myorder extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get("https://reactapp-e2c26.firebaseio.com/sample.json")
      .then(response => {
        const orders = [];
        for (let i in response.data) {
          orders.push(response.data[i]);
        }
        this.setState({ orders: orders, loading: false });
      })
      .catch(err => this.setState({ loading: false }));
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

const mapStateToProps = state => {};
const mapDisptachToProps = disptach => {};

export default connect()(withError(Myorder, axios));
