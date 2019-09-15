import * as actionTypes from "./actions";
import axios from "axios";

export const addIngridents = data => {
  return { type: actionTypes.ADDINGINGRIDENTS, data: data };
};

export const removeIngridents = data => {
  return { type: actionTypes.REMOVINGINGRIDENTS, data: data };
};

export const retrivingIngridentsFromServer = () => {
  //console.log("Launching retriving server");
  return dispatch => {
    axios
      .get("https://reactapp-e2c26.firebaseio.com/ingredients.json1")
      .then(request => {
        //console.log("Data from DB", request.data);
        dispatch({ type: actionTypes.STORINGINGRIDNETS, data: request.data });
      })
      .catch(error => {
        //console.log("Inside catch", error);
        dispatch({ type: actionTypes.ERROR, error: error });
      });
  };
};
