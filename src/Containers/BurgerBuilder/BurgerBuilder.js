import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withError from "../../hoc/WithError/withError";
import axios from "../../axios-orders";
import spinner from "../../Components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import {
  addIngridents,
  removeIngridents,
  retrivingIngridentsFromServer
} from "../../store/index";

class BurgerBuilder extends Component {
  state = {
    Purchasing: false,
    Loading: false
  };

  componentDidMount() {
    this.props.onRetrivingServer();
  }

  handlingOrderSummary = () => {
    this.setState({ Purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ Purchasing: false });
  };

  render() {
    console.log("Inside Burger Builder", this.props);

    const disabledInfor = {
      ...this.props.Ingridents
    };

    for (let item in disabledInfor) {
      disabledInfor[item] = disabledInfor[item] < 1;
    }

    let burger = this.props.error ? (
      <p>Unable to load Ingredient</p>
    ) : (
      <Spinner />
    );

    if (this.props.Ingridents) {
      const modalOrLoading = this.state.Loading ? (
        <Spinner></Spinner>
      ) : (
        <OrderSummary
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={() =>
            this.props.history.push({
              pathname: "/checkout"
            })
          }
          ingridents={this.props.Ingridents}
          Price={this.props.Price}
        />
      );

      const orderSummaryvar = (
        <Modal
          show={this.state.Purchasing}
          cancelPurchase={this.purchaseCancelHandler}
        >
          {modalOrLoading}
        </Modal>
      );

      burger = (
        <React.Fragment>
          {this.state.Purchasing ? orderSummaryvar : null}
          <Burger Ingridents={this.props.Ingridents} />
          <BuildControls
            price={this.props.Price}
            addition={this.props.onAdd}
            removal={this.props.onSubtract}
            disabled={disabledInfor}
            Purchasable={!this.props.purchasable}
            OrderSummary={this.handlingOrderSummary}
          />
        </React.Fragment>
      );
    }

    return <React.Fragment>{burger}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    Ingridents: state.Ingridents,
    Price: state.TotalPrice,
    purchasable: state.purchasable,
    error: state.error
  };
};

const mapdispatchToProps = dispatch => {
  return {
    onAdd: data => {
      dispatch(addIngridents(data));
    },
    onSubtract: data => dispatch(removeIngridents(data)),
    onRetrivingServer: () => dispatch(retrivingIngridentsFromServer())
  };
};

export default connect(
  mapStateToProps,
  mapdispatchToProps
)(withError(BurgerBuilder, axios));
