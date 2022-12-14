import { configureStore } from "@reduxjs/toolkit";
import ecvReducer from "./reducers/ecvReducer";
import authReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    ecvs: ecvReducer,
    authentication: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;