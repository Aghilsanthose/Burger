import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import instance from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withError from "../../hoc/WithError/withError";
import axios from "../../axios-orders";
import spinner from "../../Components/UI/Spinner/Spinner";

const INGRIDENT_PRICES = {
  salad: 0.5,
  meat: 1,
  cheese: 0.75,
  bacon: 1
};

class BurgerBuilder extends Component {
  state = {
    Ingridents: null,
    Price: 4,
    Purchasable: true,
    Purchasing: false,
    Loading: false,
    error: false
  };

  componentDidMount() {
    console.log("Did MOnt");
    axios
      .get("https://reactapp-e2c26.firebaseio.com/ingredients.json")
      .then(request => {
        //console.log("Request from Db", request);
        this.setState({ Ingridents: request.data });
      })
      .catch(error => {
        console.log("Inside catch", error);
        this.setState({ error: true });
      });
  }

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUpdate(nextProps, nextState) {
    console.log("Does update");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Did update", this.state.error);
  }

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
    //console.log("In addition", type);

    const updatedIngredientObj = {
      ...this.state.Ingridents
    };

    //console.log("update ingrient", updatedIngredientObj);

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
    this.setState({ Loading: true });
    const data = {
      ingridents: this.state.Ingridents,
      totalPrice: this.state.Price,
      customerName: {
        Name: "Aghil",
        Address: "XXX"
      },
      deliveryMethod: "Fastest"
    };
    //console.log("In Continue Handler");
    instance
      .post("/sample.json", data)
      .then(response => this.setState({ Loading: false, Purchasing: true }))
      .catch(error => this.setState({ Loading: false, Purchasing: true }));
  };
  render() {
    console.log("Inside Burger Builder");

    const disabledInfor = {
      ...this.state.Ingridents
    };

    for (let item in disabledInfor) {
      disabledInfor[item] = disabledInfor[item] < 1;
      // console.log("Disabled", disabledInfor[item])
    }
    //console.log("Price", this.state.Price);

    //console.log("Error status in Burger Builder", this.state.error);

    let burger = this.state.error ? (
      <p>Unable to load Ingredient</p>
    ) : (
      <Spinner />
    );

    if (this.state.Ingridents) {
      const modalOrLoading = this.state.Loading ? (
        <Spinner></Spinner>
      ) : (
        <OrderSummary
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          ingridents={this.state.Ingridents}
          Price={this.state.Price}
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

    return <React.Fragment>{burger}</React.Fragment>;
  }
}

export default withError(BurgerBuilder, axios);
