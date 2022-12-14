import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/dispatchHooks";

import { initializeEcvs } from "./reducers/ecvReducer";
import { initializeUsers } from "./reducers/userReducer";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeEcvs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const ecvs = useAppSelector(state => state.ecvs);
  const users = useAppSelector(state => state.users);
  const auth = useAppSelector(state => state.authentication);
  
  console.log("ecvs:", ecvs);
  console.log("users:", users);
  console.log("auth:", auth);

  return (
    <div>
    </div>
  );
};

export default App;