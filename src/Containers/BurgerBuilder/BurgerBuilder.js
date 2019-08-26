import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";

const INGRIDENT_PRICES = {
  salad: 0.5,
  meat: 1,
  cheese: 0.75,
  bacon: 1
};

class BurgerBuilder extends Component {
  state = {
    Ingridents: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    Price: 4,
    Purchasable: true,
    Purchasing: false
  };

  updatePurchasable(ingridentObj) {
    const NumberOfIngrdients = Object.keys(ingridentObj)
      .map(keys => {
        return ingridentObj[keys];
      })
      .reduce((acc, el) => {
        return el + acc;
      }, 0);
    // console.log("Items", NumberOfIngrdients)

    this.setState({ Purchasable: !NumberOfIngrdients > 0 });
  }

  addIngridentHandler = type => {
    // console.log("In addition", type)

    const updatedIngredientObj = {
      ...this.state.Ingridents
    };
    updatedIngredientObj[type] = this.state.Ingridents[type] + 1;
    const priceAddition = this.state.Price + INGRIDENT_PRICES[type];
    this.setState({
      Ingridents: updatedIngredientObj,
      Price: priceAddition
    });
    this.updatePurchasable(updatedIngredientObj);
  };
  removeIngridentHandler = type => {
    // console.log("In removal", type)
    const updatedIngredientObj = {
      ...this.state.Ingridents
    };
    if (this.state.Ingridents[type] > 0) {
      updatedIngredientObj[type] = this.state.Ingridents[type] - 1;
    } else {
      updatedIngredientObj[type] = 0;
    }
    let priceRemoval = NaN;
    if (this.state.Ingridents[type] > 0) {
      priceRemoval = this.state.Price - INGRIDENT_PRICES[type];
    } else {
      priceRemoval = this.state.Price;
    }

    this.setState({
      Ingridents: updatedIngredientObj,
      Price: priceRemoval
    });
    this.updatePurchasable(updatedIngredientObj);
  };

  handlingOrderSummary = () => {
    this.setState({ Purchasing: true });
    // console.log("In handling OrderSummary", this.state)
  };

  purchaseCancelHandler = () => {
    // console.log("In Cancel Handler")
    this.setState({ Purchasing: false });
  };
  purchaseContinueHandler = () => {
    console.log("In Continue Handler");
  };

  render() {
    const disabledInfor = {
      ...this.state.Ingridents
    };

    for (let item in disabledInfor) {
      disabledInfor[item] = disabledInfor[item] < 1;
      // console.log("Disabled", disabledInfor[item])
    }
    // console.log("Price", this.state.Price)
    const orderSummaryvar = (
      <Modal
        show={this.state.Purchasing}
        cancelPurchase={this.purchaseCancelHandler}
      >
        <OrderSummary
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          ingridents={this.state.Ingridents}
          Price={this.state.Price}
        />
      </Modal>
    );
    return (
      <React.Fragment>
        {this.state.Purchasing ? orderSummaryvar : null}
        <Burger Ingridents={this.state.Ingridents} />
        <BuildControls
          price={this.state.Price}
          addition={this.addIngridentHandler}
          removal={this.removeIngridentHandler}
          disabled={disabledInfor}
          Purchasable={this.state.Purchasable}
          OrderSummary={this.handlingOrderSummary}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
