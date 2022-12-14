import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/dispatchHooks";

import { isLogged } from "./reducers/authReducer";
import { initializeEcvs } from "./reducers/ecvReducer";
import { initializeUsers } from "./reducers/userReducer";

import Navbar from "./components/index/Navbar";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isLogged());
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
    <section className="bg-white">
      <Navbar />
    </section>
  );
};

export default App;