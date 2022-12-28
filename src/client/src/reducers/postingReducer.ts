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
    },
    apply(state, action) {
      const id = action.payload.id;

      const posting = state.find(posting => posting.id === id);
      posting?.applicants.push(action.payload.ecv);
    }
  }
});

export const { setPostings, append, apply } = postingSlice.actions;

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

export const applyPosting = (id: string, ecv: string) => {
  return async (dispatch: Dispatch): Promise <void> => {
    await postingsService.applyPosting(id, ecv);
    dispatch(apply({ id, ecv }));
  };
};

export default postingSlice.reducer;