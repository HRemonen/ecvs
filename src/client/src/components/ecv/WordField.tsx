import { WordFieldType } from "../../types";
import { useFieldArray } from "react-hook-form";

const WordField: React.FC<WordFieldType > = ({ label, control, register }) => {
  const { fields: fields, append: append, remove: remove } = useFieldArray({
    name: label, control});
  return (
    <div className="p-4 text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
      <div className="flex">
        <label className="flex capitalize items-center p-3 text-base font-bold text-[#1d1853]">
          {label}
        </label>
        <button id={`new-${label}-button`} type="button" onClick={() => {
          append(""); }}> Add new
        </button>
      </div>
      {fields.map((field: Record<"id", string>, index: number) => {
        return (
          <div className="flex" key={field.id}>
            <label className="flex items-center p-3 text-base text-[#1d1853]">
              {index + 1}.
            </label>
            <input id={`${label}-${index}`} type="text" 
              className="block w-[70%] bg-transparent outline-none border-b-2 py-2 px-4 placeholder-gray-500 text-gray-900 border-gray-200"
              {...register(`${label}.${index}`)}
            />
            <button id={`${label}-remove-${index}`} type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  )
};

export default WordField;