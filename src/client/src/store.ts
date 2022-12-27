import { configureStore } from "@reduxjs/toolkit";
import ecvReducer from "./reducers/ecvReducer";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import postingReducer from "./reducers/postingReducer";
import filterReducer from "./reducers/filterReducer";

export const store = configureStore({
  reducer: {
    ecvs: ecvReducer,
    users: userReducer,
    authentication: authReducer,
    postings: postingReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;