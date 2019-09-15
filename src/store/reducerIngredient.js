import * as actionTypes from "./actions";
import { addIngridents } from "./actionCreators";

const initialState = {
  Ingridents: null,
  TotalPrice: 4,
  purchasable: false,
  error: false
};

const INGRIDENT_PRICES = {
  salad: 0.5,
  meat: 1,
  cheese: 0.75,
  bacon: 1
};

const addIngridentsToBurger = (state, action) => {
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
};

const removeIngridentFromBurger = (state, action) => {
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
};

const storingIngridentToState = (state, action) => {
  return {
    ...state,
    Ingridents: action.data
  };
};

const storingError = (state, action) => {
  return {
    ...state,
    error: action.error ? true : false
  };
};

const reducerIngrident = (state = initialState, action) => {
  if (action.type === actionTypes.ADDINGINGRIDENTS) {
    return addIngridentsToBurger(state, action);
  }
  if (action.type === actionTypes.REMOVINGINGRIDENTS) {
    return removeIngridentFromBurger(state, action);
  }
  if (action.type === actionTypes.STORINGINGRIDNETS) {
    return storingIngridentToState(state, action);
  }
  if (action.type === actionTypes.ERROR) {
    return storingError(state, action);
  }
  return state;
};

export default reducerIngrident;
