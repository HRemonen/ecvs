import { createSlice, Dispatch } from "@reduxjs/toolkit";

import postingsService from "../services/postingsService";

import type { Posting } from "@backend/types";
import type { ValidatedPosting } from "@backend/utils/postingsValidator"

const initialState: Array<Posting & {id: string}> = [];

const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    setPostings(state, action) {
      return action.payload;
    },
    append(state, action) {
      state.push(action.payload);
    }
  }
});

export const { setPostings, append } = postingSlice.actions;

export const initializePostings = () => {
  return async (dispatch: Dispatch): Promise <void> => {
    const postings = await postingsService.getPostings();
    dispatch(setPostings(postings));
  };
};

export const createPosting = (posting: ValidatedPosting) => {
  return async (dispatch: Dispatch): Promise <void> => {
    const newPosting = await postingsService.createPosting(posting);
    dispatch(append(newPosting));
  };
};

export default postingSlice.reducer;