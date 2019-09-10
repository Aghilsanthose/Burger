import React, { Component } from "react";
import Order from "../../Components/Order/order";
import instance from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withError from "../../hoc/WithError/withError";

class Myorder extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    instance
      .get("https://reactapp-e2c26.firebaseio.com/sample.json")
      .then(response => {
        const orders = [];
        for (let i in response.data) {
          orders.push(response.data[i]);
        }
        console.log("In array", orders);
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

export default withError(Myorder);
