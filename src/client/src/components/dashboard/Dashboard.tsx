import { useAppSelector } from "../../hooks/dispatchHooks";
import { Routes, Route } from "react-router-dom";

import Navbar from "../index/Navbar";
import NavItem from "../index/NavItem";
import UserDetails from "./UserDetails";
import RenderEcvs from "../ecv/RenderEcvs";
import Dash from "./Dash";
import NewEcvForm from "../ecv/NewEcvForm";
import Applications from "./Applications";

const Dashboard = () => {
  const auth = useAppSelector(state => state.authentication);
  const users = useAppSelector(state => state.users);
  const ecvs = useAppSelector(state => state.ecvs);

  const user = users.find(u => u.id === auth.user.id);

  if (!user) {
    return null;
  }
  const userEcvs = ecvs.filter(e => (e.user) as unknown === user.id || (e.user.id) as unknown === user.id);
  
  return (
    <>
      <Navbar />
      <div className="grid gap-4 grid-cols-3 grid-rows-1">
        <UserDetails user={user} />
        <div className="col-span-2">
          <div className="flex items-center border-b border-gray-400 justify-between h-12 mx-auto px-4">
            <ul className="flex">
              <NavItem content='Dash' to='' />
              <NavItem content='Ecvs' to='ecvs' />
              <NavItem content='Applications' to='applications' />
            </ul>
          </div>
          <div className="">
            <Routes>
              <Route path="" element={<Dash />} />
              <Route path="/ecvs" element={<RenderEcvs ecvs={userEcvs} />} />
              <Route path="/ecvs/create" element={<NewEcvForm />} />
              <Route path="/applications" element={<Applications user={user}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;