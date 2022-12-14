import { createSlice, Dispatch } from "@reduxjs/toolkit";
import loginService from "../services/loginService";
import ecvsService from "../services/ecvsService";

import { AuthenticatedUser } from "src/types";

const initialState = null;

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return initialState;
    }
  }
});

export const { login, logout } = authSlice.actions;

export const isLogged = () => {
  return async (dispatch: Dispatch) => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user: AuthenticatedUser = JSON.parse(loggedUser);
      //set the token to ecvsService
      //ecvsService.setToken(user.token);
      dispatch(login(user));
    }
  };
};

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    const user = await loginService.login({
      email,
      password
    })
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch(logout(null));
  };
};

export default authSlice.reducer;