import { useState } from "react";

import { useAppDispatch } from "../../hooks/dispatchHooks";
import { updateEcv, deleteEcv } from "../../reducers/ecvReducer";

import DeleteButton from "../misc/Buttons";
import EcvFields from "./EcvFields";
import { MdOutlineSyncProblem } from "react-icons/md";

import type { Ecv } from "@backend/types";

const EcvCard: React.FC<{ecv: Ecv & {id: string}}> = ({ ecv }) => {
  const initialName = ecv.name ? ecv.name : `Ecv # ${ ecv.id }`
  const [name, setName] = useState(initialName);
  const [newName, setNewName] = useState(name);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();

  const handleNameChange = async () => {
    try {
      await dispatch(updateEcv({ ...ecv, name: newName }));
      setName(newName);
      setEditMode(false);
    } 
    catch (error) {
      console.log(error);
    }
  };

  console.log(ecv.applied)

  return (
    <div className="p-4">
      <div className="grow border border-gray-400 md:border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal">
        <div className="flex justify-between items-center">
          { editMode
            ? <div className="flex ">
                <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
                  <MdOutlineSyncProblem size={24}/>
                </span>
                <input type="text" 
                  className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-1" 
                  defaultValue={name} onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNameChange()
                  }}
                />
                <button className="ml-4" onClick={() => setEditMode(!editMode)}>Cancel</button>
              </div>
            : <h5 className="font-light text-gray-600" onDoubleClick={() => setEditMode(!editMode)}>
                { name }
              </h5>
          }
          <div>
            <h1 className="font-light text-gray-600">{ new Date(ecv.createdOn).toDateString() }</h1>
          </div>
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