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
    },
    appendUserApplication(state, action) {
      const id = action.payload.id;

      const user = state.find(user => user.id === id);
      user?.applications.push(action.payload.posting);
    },
    appendUserEcv(state, action) {
      const id = action.payload.id;

      const user = state.find(user => user.id === id);
      user?.ecvs.push(action.payload.ecv);
    },
  }
});

export const { setUsers, append, appendUserApplication, appendUserEcv } = userSlice.actions;

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
  };
};

export const appendApplication = (id: string, posting: string) => {
  return async (dispatch: Dispatch): Promise <void> => {
    dispatch(appendUserApplication({ id, posting }));
  };
};

export const appendEcv = (id: string, ecv: string) => {
  return async (dispatch: Dispatch): Promise <void> => {
    dispatch(appendUserEcv({ id, ecv }));
  };
}

export default userSlice.reducer;