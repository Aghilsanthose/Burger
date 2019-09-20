import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    // token: authData.idToken,
    // userId: authData.localId
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return {
    type: actionTypes.AUTH_EXPIRY
  };
};

export const authExpiry = expirationTimeout => {
  return dispatch => {
    setTimeout(() => dispatch(authLogout()), expirationTimeout * 1000);
  };
};

export const auth = (email, passWord, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: passWord,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKbghOAUfUry7rAMcVO596vaKBxbfniRk";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKbghOAUfUry7rAMcVO596vaKBxbfniRk";
    }
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expiration", expirationDate);
        dispatch(authSuccess(response.data));
        dispatch(authExpiry(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const redirect = path => {
  return {
    type: actionTypes.REDIRECTING,
    path: path
  };
};

export const isTokenPresentInLocal = () => {
  const token = localStorage.getItem("token");
  const expiration = new Date(localStorage.getItem("expiration"));
  return dispatch => {
    if (!token) {
      dispatch(authLogout());
    } else {
      if (new Date() < expiration) {
        axios
          .post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCKbghOAUfUry7rAMcVO596vaKBxbfniRk",
            { idToken: token }
          )
          .then(response => {
            const authData = {
              localId: response.data.users[0].localId,
              idToken: token
            };
            dispatch(authSuccess(authData));
            dispatch(
              authExpiry((expiration.getTime() - new Date().getTime()) / 1000)
            );
          });
      } else {
        dispatch(authLogout());
      }
    }
  };
};
