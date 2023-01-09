import { createSlice, Dispatch } from "@reduxjs/toolkit";

import ecvsService from "../services/ecvsService";

import type { Ecv } from '@backend/types';
import type { ValidatedEcv } from "@backend/utils/ecvsValidator";

const initialState: Array<Ecv & {id: string}> = [];

const ecvsSlice = createSlice({
  name: "ecvs",
  initialState,
  reducers: {
    setEcvs(state, action) {
      return action.payload;
    },
    append(state, action) {
      state.push(action.payload);
    },
    update(state, action) {
      const updatedEcv = action.payload;
      return state.map(ecv => ecv.id !== updatedEcv.id ? ecv : updatedEcv);
    },
    remove(state, action) {
      return state.filter(ecv => ecv.id !== action.payload);
    }
  }
});

export const { setEcvs, append, update, remove } = ecvsSlice.actions;

export const initializeEcvs = () => {
  return async (dispatch: Dispatch): Promise <void> => {
    const ecvs = await ecvsService.getEcvs();
    dispatch(setEcvs(ecvs));
  };
};

export const createEcv = (ecv: ValidatedEcv) => {
  return async (dispatch: Dispatch): Promise <void> => {
    const newEcv = await ecvsService.createEcv(ecv);
    dispatch(append(newEcv));
  };
};

export const updateEcv = (ecv: Ecv) => {
  return async (dispatch: Dispatch): Promise <void> => {
    const updatedEcv = await ecvsService.updateEcv(ecv);
    dispatch(update(updatedEcv));
  };
};

export const deleteEcv = (ecv: Ecv & {id: string}) => {
  return async (dispatch: Dispatch): Promise <void> => {
    await ecvsService.removeEcv(ecv.id)
    dispatch(remove(ecv.id));
  };
};

export default ecvsSlice.reducer;