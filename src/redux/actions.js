import axios from "axios";
import * as types from "./actionTypes";

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (token) => ({
  type: types.LOGIN_SUCCESS,
  payload: token,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

export const logoutUserInitiate = () => ({
  type: types.LOGOUT_USER,
})

export const setErrorEmpty = () => ({
  type: types.SET_ERROR_EMPTY
})

export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());
    axios
      .post("https://reqres.in/api/login", {
        email,
        password,
      })
        .then((response) => {
          console.log("response", response);
          dispatch(loginSuccess(response.data.token));
        })
        .catch((error) => {
          dispatch(loginFail(error.response.data.error))
        });
  };
};
