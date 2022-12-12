import { createSlice, Dispatch } from "@reduxjs/toolkit";
import ecvsService from "../services/ecvsService";
import { Ecv } from '@backend/types'

const initialState: Array<Ecv> = [];

const ecvsSlice = createSlice({
  name: "ecvs",
  initialState,
  reducers: {
    setEcvs(state, action) {
      return action.payload;
    }
  }
});

export const { setEcvs } = ecvsSlice.actions;

export const initializeEcvs = () => {
  return async (dispatch: Dispatch): Promise <void> => {
    const ecvs = await ecvsService.getEcvs();
    dispatch(setEcvs(ecvs));
  };
};

export default ecvsSlice.reducer;