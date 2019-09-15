import * as actionTypes from "./actionsTypes";

export const addIngridents = type => {
  return {
    type: actionTypes.ADDINGINGRIDENTS,
    data: type
  };
};

export const removeIngridents = type => {
  return {
    type: actionTypes.REMOVINGINGRIDENTS,
    data: type
  };
};
