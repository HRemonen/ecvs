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
import NotFound from "./components/misc/NotFound";
import Register from "./components/authentication/Register";
import { initializePostings } from "./reducers/postingReducer";
import Postings from "./components/postings/Postings";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(isLogged());
    void dispatch(initializeEcvs());
    void dispatch(initializeUsers());
    void dispatch(initializePostings())
  }, [dispatch]);

  return (
    <Router>
      <section className="bg-white">
        <Routes>
          <Route path="/" element={ <Index /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/postings" element={ <Postings /> } />
          <Route path="/postings/:id" />
          <Route path="/dashboard/*" element={ <Dashboard /> } />
          <Route path="*"element={ <NotFound /> }/>
        </Routes>
      </section>
    </Router>

  );
};

export default App;