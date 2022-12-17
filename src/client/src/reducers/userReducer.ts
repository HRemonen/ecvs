import { createSlice, Dispatch } from "@reduxjs/toolkit";

import usersService from "../services/usersService";

import type { User } from "@backend/types";

const initialState: Array<User & {id: string}> = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    }
  }
});

export const { setUsers } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch: Dispatch) => {
    const users = await usersService.getUsers();
    dispatch(setUsers(users));
  };
};

export default userSlice.reducer;