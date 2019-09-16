import * as actionTypes from "../actions/actionsTypes";
import axios from "../../axios-orders";

export const storingDataOnServer = data => {
  return dispatch => {
    dispatch(startPurchasing());
    axios
      .post("/sample.json", data)
      .then(response => {
        dispatch({
          type: actionTypes.STORINGDATATOSERVER,
          id: response.data.name
        });
      })
      .catch(err => dispatch({ type: actionTypes.ERRORONSTORINGDATATOSERVER }));
  };
};

export const startPurchasing = () => {
  return {
    type: actionTypes.LOADING
  };
};
