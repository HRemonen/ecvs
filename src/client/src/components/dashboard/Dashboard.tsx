import { useAppSelector } from "../../hooks/dispatchHooks";
import { Routes, Route } from "react-router-dom";

import Navbar from "../index/Navbar";
import NavItem from "../index/NavItem";
import UserDetails from "./UserDetails";
import RenderEcvs from "../ecv/RenderEcvs";
import Dash from "./Dash";
import NewEcvForm from "../ecv/NewEcvForm";
import Applications from "./Applications";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const auth = useAppSelector(state => state.authentication);
  const users = useAppSelector(state => state.users);
  const ecvs = useAppSelector(state => state.ecvs);

  const user = users.find(u => u.id === auth.user.id);

  if (!user) {
    return null;
  }
  const userEcvs = ecvs.filter(e => (e.user) as unknown === user.id || (e.user.id) as unknown === user.id);
  
  const dashItemStyle = ({ isActive }) => isActive ? activeStyle : listItemStyle;

  const activeStyle = "inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
  const listItemStyle = "inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3";

  return (
    <>
      <Navbar />
      <div className="grid gap-4 grid-cols-4">
        <div className="row-start-1 col-span-4 items-center border-b border-gray-400 h-12 px-4">
          <div className="ml-[25%]">
            <ul className="flex">
              <li className="mr-3">
                <NavLink to="" className={dashItemStyle} end>Dash</NavLink>
              </li>
              <li className="mr-3">
                <NavLink to="ecvs" className={dashItemStyle}>Ecvs</NavLink>
              </li>
              <li className="mr-3">
                <NavLink to="applications" className={dashItemStyle}>Applications</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <UserDetails user={user} />
        <div className="col-span-4 md:col-span-3">
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