import { useState } from "react";

import DeleteButton from "../misc/Buttons";

import { useAppDispatch } from "../../hooks/dispatchHooks";
import { deleteEcv } from "../../reducers/ecvReducer";

import type { Ecv } from "@backend/types";

const EcvField: React.FC<{field: string; content: string | string[] | object[]}> = ({ field, content }) => {
  const [visible, setVisible] = useState(false)

  if (field === "user" || field === "id") return null;

  const renderContent = () => {
    if (field === "education" || field === "experience") {
      return (
        <div className="ml-6">
          { content.map(entry => (
            <div key={entry.company} className="text-sm border-b-2 hover:border-gray-400">
              <h1 className="text-lg font-semibold">{entry.company}</h1>
              <p className="text-gray-400">{new Date(entry.startDate).toDateString()} - {new Date(entry.endDate).toDateString()}</p>
              <p >{ entry.position }</p>
              <p className="text-gray-600 mt-4">{entry.additionalInfo}</p>
            </div>
          ))}
        </div>
      )
    }
    return <p className="flex-1 ml-3">{ content as string }</p> 
  };

  return (
    <div className="text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
      <h1 className="flex items-center p-3 text-xl font-bold">
        <p className="flex-1 whitespace-nowrap cursor-pointer" onClick={() => setVisible(!visible)}>{ field }</p>
      </h1>
      { visible && renderContent() }
    </div>
  )
};

const EcvCard: React.FC<{ecv: Ecv & {id: string}}> = ({ ecv }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-6">
        <h5 className="text-base font-semibold text-gray-900 md:text-xl">
          Ecv # { ecv.id }
        </h5>
        <ul className="my-4 space-y-3">
          <li>
            { Object.entries(ecv).map(([key, value]) => (
              <EcvField key={key} field={key} content={value}/>
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