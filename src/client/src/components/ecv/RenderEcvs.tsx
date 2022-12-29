import EcvCard from "./EcvCard";

import type { Ecv } from "@backend/types";

const RenderEcvs: React.FC<{ecvs: Array<Ecv & {id: string;}>}> = ({ ecvs }) => {

  if (!ecvs || ecvs.length === 0) return (
    <div>
      <h1>You don&lsquo;t have any ecv&lsquo;s created.</h1>
    </div>
  );

  return (
    <div className="">
      {ecvs.map(e => (
        <EcvCard key={e.id} ecv={e} />
      ))}
    </div>
  )
};

export default RenderEcvs;
