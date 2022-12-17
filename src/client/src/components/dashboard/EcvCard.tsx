import { useState } from "react";

import { useAppDispatch } from "../../hooks/dispatchHooks";
import { deleteEcv } from "../../reducers/ecvReducer";

import type { Ecv } from "@backend/types";

const EcvField: React.FC<{field: string; content: string | string[]}> = ({ field, content }) => {
  const [visible, setVisible] = useState(false)

  if (field === "user" || field === "id") return null;

  return (
    <li>
      <div className="text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
        <h1 className="flex items-center p-3 text-base font-bold">
          <p className="flex-1 ml-3 whitespace-nowrap cursor-pointer" onClick={() => setVisible(!visible)}>{ field }</p>
        </h1>
        {visible && <p className="flex-1 ml-3">{ content }</p>}
      </div>
    </li>
  )
};

const EcvCard: React.FC<{ecv: Ecv & {id: string}}> = ({ ecv }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-6">
        <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
            Ecv # { ecv.id }
        </h5>
        <ul className="my-4 space-y-3">
          { Object.entries(ecv).map(([key, value]) => {
              return <EcvField key={key} field={key} content={value}/>
          })}
        </ul>
        <div>
          <button onClick={() => dispatch(deleteEcv(ecv))}
            >Delete
          </button>
        </div>
    </div>
  )
};

export default EcvCard;