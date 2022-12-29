import DeleteButton from "../misc/Buttons";

import EcvFields from "./EcvFields";

import { useAppDispatch } from "../../hooks/dispatchHooks";
import { deleteEcv } from "../../reducers/ecvReducer";

import type { Ecv } from "@backend/types";

const EcvCard: React.FC<{ecv: Ecv & {id: string}}> = ({ ecv }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="p-4">
      <div className="grow border border-gray-400 md:border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal">
        <div className="flex justify-between items-center">
          <h5 className="font-light text-gray-600">
            Ecv # { ecv.id }
          </h5>
          <div>
            <DeleteButton onClick={() => dispatch(deleteEcv(ecv))} />
          </div>
        </div>
        <div>
          <ul>
            <li>
              { Object.entries(ecv).map(([key, value]) => (
                <EcvFields key={key} field={key} content={value}/>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default EcvCard;