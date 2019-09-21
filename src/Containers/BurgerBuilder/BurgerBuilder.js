import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withError from "../../hoc/WithError/withError";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    Purchasing: false,
    Loading: false
  };

  componentDidMount() {
    //console.log("In DidMount", this.props);
    this.props.onRetrivingServer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.building) {
      this.props.toRedirect("/checkout");
    }
  }

  handlingOrderSummary = () => {
    if (this.props.isAuthendicated) {
      this.setState({ Purchasing: true });
    } else {
      this.props.history.push("/signin");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ Purchasing: false });
  };

  render() {
    //console.log("Inside Burger Builder", this.props);

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
            isAuthendicated={this.props.isAuthendicated}
          />
        </React.Fragment>
      );
    }
    return <React.Fragment>{burger}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    Ingridents: state.burgerBuilder.Ingridents,
    Price: state.burgerBuilder.TotalPrice,
    purchasable: state.burgerBuilder.purchasable,
    error: state.burgerBuilder.error,
    isAuthendicated: state.auth.token,
    building: state.burgerBuilder.building
  };
};

const mapdispatchToProps = dispatch => {
  return {
    onAdd: data => {
      dispatch(actions.addIngridents(data));
    },
    onSubtract: data => dispatch(actions.removeIngridents(data)),
    onRetrivingServer: () => dispatch(actions.retrivingIngridentsFromServer()),
    toRedirect: path => dispatch(actions.redirect(path))
  };
};

export default connect(
  mapStateToProps,
  mapdispatchToProps
)(withError(BurgerBuilder, axios));
