import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/dispatchHooks";

import { initializeEcvs } from "./reducers/ecvReducer";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeEcvs());
  }, [dispatch]);

  const ecvs = useAppSelector(state => state.ecvs)
  console.log(ecvs);
  return (
    <div>
    </div>
  );
};

export default App;