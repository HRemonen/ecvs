import DeleteButton from "../misc/Buttons";

import EcvFields from "./EcvFields";

import { useAppDispatch } from "../../hooks/dispatchHooks";
import { deleteEcv } from "../../reducers/ecvReducer";

import type { Ecv } from "@backend/types";

const EcvCard: React.FC<{ecv: Ecv & {id: string}}> = ({ ecv }) => {
  const dispatch = useAppDispatch();
  console.log(ecv)

  return (
    <div className="grid grid-cols-1 max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h5 className="font-light text-gray-600">
          Ecv # { ecv.id }
        </h5>
        <div>
          <DeleteButton onClick={() => dispatch(deleteEcv(ecv))} />
        </div>
      </div>
      
      <div className="">
        <ul className="">
          <li className="">
            { Object.entries(ecv).map(([key, value]) => (
              <EcvFields key={key} field={key} content={value}/>
            ))}
          </li>
        </ul>
        
      </div>
    </div>
  )
};

export default EcvCard;