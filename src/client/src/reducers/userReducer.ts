import { createSlice, Dispatch } from "@reduxjs/toolkit";

import usersService from "../services/usersService";

import type { User } from "@backend/types";
import type { ValidatedUser } from "@backend/utils/usersValidator";

const initialState: Array<User & {id: string}> = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    append(state, action) {
      state.push(action.payload)
    }
  }
});

export const { setUsers, append } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch: Dispatch) => {
    const users = await usersService.getUsers();
    dispatch(setUsers(users));
  };
};

export const createUser = (user: ValidatedUser) => {
  return async (dispatch: Dispatch): Promise <void> => {
    const newUser = await usersService.createUser(user);
    dispatch(append(newUser));
  }
};

export default userSlice.reducer;