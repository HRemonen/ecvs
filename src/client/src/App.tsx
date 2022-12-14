import { useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/dispatchHooks";

import { isLogged } from "./reducers/authReducer";
import { initializeEcvs } from "./reducers/ecvReducer";
import { initializeUsers } from "./reducers/userReducer";

import Navbar from "./components/index/Navbar";
import Index from "./components/index/Index";

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
    <Router>
      <section className="bg-white">
        <Navbar />

        <Routes>
          <Route path="/" element={ <Index /> } />

        </Routes>
      </section>
    </Router>

  );
};

export default App;