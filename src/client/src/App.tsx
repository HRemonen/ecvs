import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppDispatch } from "./hooks/dispatchHooks";

import { isLogged } from "./reducers/authReducer";
import { initializeEcvs } from "./reducers/ecvReducer";
import { initializeUsers } from "./reducers/userReducer";

import Index from "./components/index/Index";
import Login from "./components/authentication/Login";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(isLogged());
    void dispatch(initializeEcvs());
    void dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <Router>
      <section className="bg-white">
        <Routes>
          <Route path="/" element={ <Index /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/dashboard/*" element={ <Dashboard /> } />
        </Routes>
      </section>
    </Router>

  );
};

export default App;