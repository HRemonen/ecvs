import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHooks";

import { loginUser } from "../../reducers/authReducer";

const Logout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authentication);

  return 
};