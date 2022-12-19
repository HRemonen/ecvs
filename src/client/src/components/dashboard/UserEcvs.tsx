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
    <div className="md:ml-2">
      <div className="grid gap-2 md:gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
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
