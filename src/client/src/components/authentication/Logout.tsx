import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/dispatchHooks";
import { logoutUser } from "../../reducers/authReducer";

const Logout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(logoutUser());

  return (
    <li className="p-4 text-yellow-500 hover:text-red-400">
      <Link onClick={handleLogout} to="/">Logout</Link>
    </li>
  );
};

export default Logout;