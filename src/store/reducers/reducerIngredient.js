import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  Ingridents: {},
  TotalPrice: 4,
  purchasable: false
};

const reducerIngrident = (state = initialState, action) => {
  const INGRIDENT_PRICES = {
    salad: 0.5,
    meat: 1,
    cheese: 0.75,
    bacon: 1
  };
  if (action.type === actionTypes.ADDINGINGRIDENTS) {
    if (typeof action.data === "object")
      return {
        ...state,
        Ingridents: action.data
      };
    else {
      const type = action.data;
      const temp = { ...state.Ingridents };
      temp[type] = temp[type] + 1;
      const purchasable =
        Object.keys(temp)
          .map(key => temp[key])
          .reduce((acc, el) => acc + el, 0) > 0;
      return {
        ...state,
        Ingridents: temp,
        TotalPrice: state.TotalPrice + INGRIDENT_PRICES[type],
        purchasable: purchasable
      };
    }
  }
  if (action.type === actionTypes.REMOVINGINGRIDENTS) {
    const type = action.data;
    if (state.Ingridents[type] > 0) {
      const temp = { ...state.Ingridents };
      temp[type] = temp[type] - 1;
      const purchasable =
        Object.keys(temp)
          .map(key => temp[key])
          .reduce((acc, el) => acc + el, 0) > 0;
      return {
        ...state,
        Ingridents: temp,
        TotalPrice: state.TotalPrice - INGRIDENT_PRICES[type],
        purchasable: purchasable
      };
    }
  }
  return state;
};

export default reducerIngrident;
