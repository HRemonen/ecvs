import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    newFilter(_state, action) {
      return action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearFilter(_state, _action) {
      return initialState;
    }
  }
});

export const { newFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;