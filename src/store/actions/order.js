import * as actionTypes from "../actions/actionsTypes";
import axios from "../../axios-orders";

export const storingDataOnServer = (data, token) => {
  return dispatch => {
    dispatch(startPurchasing());
    axios
      .post("/sample.json?auth=" + token, data)
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
