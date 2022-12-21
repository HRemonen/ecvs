import { useAppSelector } from "../../hooks/dispatchHooks";
import { Routes, Route } from "react-router-dom";

import Navbar from "../index/Navbar";
import NavItem from "../index/NavItem";
import UserDetails from "./UserDetails";
import UserEcvs from "../ecv/UserEcvs";
import Dash from "./Dash";
import NewEcvForm from "../ecv/NewEcvForm";

const Dashboard = () => {
  const auth = useAppSelector(state => state.authentication);
  const users = useAppSelector(state => state.users);

  const user = users.find(u => u.id === auth.user.id);

  console.log("auth:", auth, "user:", user)
  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="grid gap-4 grid-cols-3 grid-rows-1">
        <UserDetails user={user} />
        <div className="col-span-2">
          <div className="flex justify-between items-center h-24 mx-auto px-4">
            <ul className="flex">
              <NavItem content='Dash' to='' />
              <NavItem content='Ecvs' to='ecvs' />
              <NavItem content='Postings' to='postings' />
            </ul>
          </div>
          <div className="">
            <Routes>
              <Route path="" element={<Dash />} />
              <Route path="/ecvs" element={<UserEcvs user={user} />} />
              <Route path="/ecvs/create" element={<NewEcvForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;