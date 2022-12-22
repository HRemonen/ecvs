import DeleteButton from "../misc/Buttons";

import { TbGridDots } from "react-icons/tb";

import EcvFields from "./EcvFields";

import { useAppDispatch } from "../../hooks/dispatchHooks";
import { deleteEcv } from "../../reducers/ecvReducer";

import type { Ecv } from "@backend/types";

const EcvCard: React.FC<{ecv: Ecv & {id: string}}> = ({ ecv }) => {
  const dispatch = useAppDispatch();
  console.log(ecv)
  return (
    <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-6">
      <div className="flex relative">
        <h5 className="text-base text-gray-900 md:text-lg">
          Ecv # { ecv.id }
        </h5>
        <TbGridDots className="absolute top-1 right-0 cursor-pointer" size={20} />
      </div>
      
      <ul className="my-4 space-y-3">
        <li>
          { Object.entries(ecv).map(([key, value]) => (
            <EcvFields key={key} field={key} content={value}/>
          ))}
        </li>
      </ul>
      <div>
        <DeleteButton onClick={() => dispatch(deleteEcv(ecv))} />
      </div>
    </div>
  )
};

export default EcvCard;