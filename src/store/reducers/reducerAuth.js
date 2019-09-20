import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  token: null,
  error: null,
  loading: false,
  userId: null,
  redirectURL: "/"
};

const authSuccess = (state, action) => {
  return {
    ...state,
    userId: action.authData.localId,
    loading: false,
    error: null,
    token: action.authData.idToken
  };
};

const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actionTypes.AUTH_EXPIRY:
      return {
        ...state,
        userId: null,
        token: null
      };
    case actionTypes.REDIRECTING:
      return {
        ...state,
        redirectURL: action.path
      };
    default:
      return state;
  }
};

export default reducerAuth;
