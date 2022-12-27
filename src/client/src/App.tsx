import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/dispatchHooks";

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
import Posting from "./components/postings/Posting";

const App = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.authentication.user.id);

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
          <Route path="/postings/:id" element={ auth ? <Posting /> : <Navigate replace to="/login" />} />
          <Route path="/dashboard/*" element={ auth ? <Dashboard /> : <Navigate replace to="/login" /> } />
          <Route path="*"element={ <NotFound /> }/>
        </Routes>
      </section>
    </Router>

  );
};

export default App;