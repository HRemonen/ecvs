import { useAppSelector } from "../../hooks/dispatchHooks";

import EcvCard from "./EcvCard";

import type { User } from "@backend/types";

const UserEcvs: React.FC<{user: User & {id: string}}> = ({ user }) => {
  const allEcvs = useAppSelector(state => state.ecvs);
  const ecvs = allEcvs.filter(e => (e.user.id) as unknown === user.id)

  if (!ecvs) return (
    <h1>You don&lsquo;t have any ecv&lsquo;s created.</h1>
  );

  return (
    <div className="ml-4">
      <button className="mb-8 bg-yellow-500 hover:bg-transparent text-white hover:text-yellow-500 border hover:border-yellow-500 font-bold py-2 px-4 rounded-full">
        Create new ecv
      </button>
      <div className="flex">
        {ecvs && ecvs.map(e => {
          return <EcvCard key={e.id} ecv={e}></EcvCard>
        })}
      </div>
    </div>
    
  )
};

export default UserEcvs;
