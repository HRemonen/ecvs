import { WordFieldType } from "../../types";
import { useFieldArray } from "react-hook-form";

import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

const labelClass = "block mb-2 text-lg font-semibold capitalize text-[#1d1853]"
const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

const FormWordField: React.FC<WordFieldType > = ({ label, control, register }) => {
  const { fields: fields, append: append, remove: remove } = useFieldArray({
    name: label, control});
  return (
    <div className="p-4 text-gray-900 group">
      <div className="grid grid-cols-2">
        <label className={labelClass}>
          {label}
        </label>
        <button id={`new-${label}-button`} type="button" onClick={() => {
          append(""); }}> <BsPlusSquare size={24}/>
        </button>
      </div>
      <div className="grid grid-cols-2">
        {fields.map((field: Record<"id", string>, index: number) => {
          return (
            <div className="my-4 mr-4" key={field.id}>
              <div className="flex space-x-4">
                <label className={labelClass}>
                  {index + 1}.
                </label>
                <input id={`${label}-${index}`} type="text" 
                  className={inputClass}
                  {...register(`${label}.${index}`)}
                />
                <button id={`${label}-remove-${index}`} type="button" onClick={() => remove(index)}>
                  <BsDashSquare size={24}/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
};

export default FormWordField;