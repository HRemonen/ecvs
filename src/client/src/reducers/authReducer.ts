import { createSlice, Dispatch } from "@reduxjs/toolkit";
import loginService from "../services/loginService";
import ecvsService from "../services/ecvsService";

import { AuthenticatedUser } from "src/types";

const initialState: AuthenticatedUser = {
  token: "",
  user: {
    email: "",
    id: "",
    name: ""
  }
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logout(state, action) {
      return initialState;
    }
  }
});

export const { login, logout } = authSlice.actions;

export const isLogged = () => {
  return (dispatch: Dispatch) => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user: AuthenticatedUser = JSON.parse(loggedUser);
      ecvsService.setToken(user.token);
      dispatch(login(user));
    }
  };
};

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    const user: AuthenticatedUser = await loginService.login({
      email,
      password
    });
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    ecvsService.setToken(user.token);
    dispatch(login(user));
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch(logout(initialState));
  };
};

export default authSlice.reducer;