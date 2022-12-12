import { configureStore } from "@reduxjs/toolkit";
import ecvReducer from "./reducers/ecvReducer";

export const store = configureStore({
  reducer: {
    ecvs: ecvReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;