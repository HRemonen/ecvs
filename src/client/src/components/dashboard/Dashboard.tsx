import { useAppSelector } from "../../hooks/dispatchHooks";

import UserDetails from "./UserDetails";

const Dashboard = () => {
  const auth = useAppSelector(state => state.authentication);
  const users = useAppSelector(state => state.users);

  const user = users.find(u => u.id === auth.user.id);
  if (!user) return null;
  
  console.log(user)

  return (
    <div>
      <UserDetails user={user}/>
    </div>
  )
};

export default Dashboard;