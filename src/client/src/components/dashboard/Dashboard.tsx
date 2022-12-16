import { useAppSelector } from "../../hooks/dispatchHooks";
import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "../index/Navbar";
import NavItem from "../index/NavItem";
import UserDetails from "./UserDetails";
import UserEcvs from "./UserEcvs";

const Dashboard = () => {
  const auth = useAppSelector(state => state.authentication);
  const users = useAppSelector(state => state.users);


  const user = users.find(u => u.id === auth.user.id);
  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="grid gap-4 grid-cols-3 grid-rows-1">
        <UserDetails user={user} />
        <div className="col-span-2">
          <div className="flex justify-between items-center h-24 mx-auto px-4">
            <ul className="hidden md:flex">
              <NavItem content='Dash' to='/dashboard' />
              <NavItem content='Ecvs' to='/dashboard/ecvs' />
              <NavItem content='Postings' to='/dashboard/postings' />
            </ul>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      
      <Routes>
        <Route path="/ecvs" element={<UserEcvs user={user} />} />
      </Routes>
    </>
  )
};

export default Dashboard;