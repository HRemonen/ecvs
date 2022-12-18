import { useAppSelector } from "../../hooks/dispatchHooks";

import EcvCard from "./EcvCard";

import type { User } from "@backend/types";

const UserEcvs: React.FC<{user: User & {id: string}}> = ({ user }) => {
  const ecvs = useAppSelector(state => state.ecvs);

  console.log("täältä:", ecvs)

  if (!ecvs || ecvs.length === 0) return (
    <div>
      <h1>You don&lsquo;t have any ecv&lsquo;s created.</h1>
    </div>
  );

  return (
    <div className="ml-4">
      <div className="flex">
        {ecvs.map(e => {
          if ((e.user.id) as unknown === user.id) {
            return <EcvCard key={e.id} ecv={e}></EcvCard>
          }
        })}
      </div>
    </div>
  )
};

export default UserEcvs;
