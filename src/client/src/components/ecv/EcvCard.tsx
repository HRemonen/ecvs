import { useState } from "react";

import { useAppDispatch } from "../../hooks/dispatchHooks";
import { updateEcv, deleteEcv } from "../../reducers/ecvReducer";

import DeleteButton from "../misc/Buttons";
import EcvFields from "./EcvFields";

import type { Ecv } from "@backend/types";

const EcvCard: React.FC<{ecv: Ecv & {id: string}}> = ({ ecv }) => {
  const initialName = ecv.name ? ecv.name : `Ecv # ${ ecv.id }`
  const [name, setName] = useState(initialName);
  const [newName, setNewName] = useState(name);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();

  console.log(ecv.name)

  const handleNameChange = async () => {
    try {
      await dispatch(updateEcv({ ...ecv, name: newName }));
      setName(newName);
      setEditMode(false);
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4">
      <div className="grow border border-gray-400 md:border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal">
        <div className="flex justify-between items-center">
          { editMode
            ? <div>
                <input type="text" defaultValue={name} onChange={(e) => setNewName(e.target.value)}/>
                <button onClick={() => setEditMode(!editMode)}>Cancel</button>
                <button onClick={handleNameChange}>OK </button>
              </div>
            : <h5 className="font-light text-gray-600" onDoubleClick={() => setEditMode(!editMode)}>
                { name }
              </h5>
          }
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