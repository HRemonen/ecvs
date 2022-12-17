import { User } from "@backend/types";
import { useAppSelector } from "../../hooks/dispatchHooks";

import EcvCard from "./EcvCard";

const UserEcvs: React.FC<{user: User & {id: string}}> = ({ user }) => {
  const allEcvs = useAppSelector(state => state.ecvs);
  const ecvs = allEcvs.filter(e => (e.user.id) as unknown === user.id)

  console.log(ecvs)

  if (!ecvs) return (
    <h1>You don&lsquo;t have any ecv&lsquo;s created.</h1>
  );

  return (
    <div className="flex">
      {ecvs && ecvs.map(e => {
        return <EcvCard key={e.id} ecv={e}></EcvCard>
      })}
    </div>
  )
};

export default UserEcvs;
