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
    remove(state, action) {
      return state.filter(ecv => ecv.id !== action.payload);
    }
  }
});

export const { setEcvs, append, remove } = ecvsSlice.actions;

export const initializeEcvs = () => {
  return async (dispatch: Dispatch): Promise <void> => {
    const ecvs = await ecvsService.getEcvs();
    dispatch(setEcvs(ecvs));
  };
};

export const createEcv = (ecv: ValidatedEcv) => {
  console.log("create this:", ecv)
  return async (dispatch: Dispatch): Promise <void> => {
    const newEcv = await ecvsService.createEcv(ecv);
    console.log("this was created:", newEcv)
    dispatch(append(newEcv));
  };
};

export const deleteEcv = (ecv: Ecv & {id: string}) => {
  return async (dispatch: Dispatch): Promise <void> => {
    await ecvsService.removeEcv(ecv.id)
    dispatch(remove(ecv.id));
  };
};

export default ecvsSlice.reducer;