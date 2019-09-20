import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  id: null,
  loading: false,
  error: false,
  redirect: false
};

const reducerOrder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORINGDATATOSERVER:
      return {
        ...state,
        id: action.id,
        loading: false,
        redirect: true
      };
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ERRORONSTORINGDATATOSERVER:
      return {
        ...state,
        error: true,
        loading: false
      };
  }
  return state;
};

export default reducerOrder;
