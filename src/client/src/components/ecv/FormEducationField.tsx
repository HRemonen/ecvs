import { useFieldArray } from "react-hook-form";

import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import { inputWrapper, labelClass, inputClass } from "./NewEcvForm";

import { EducationFieldType } from "../../types";

const FormEducationField: React.FC<EducationFieldType > = ({ error, control, register }) => {
  const { fields: eduFields, append: eduAppend, remove: eduRemove } = useFieldArray({
    name: "education", control});
  return (
    <div className={inputWrapper}>
      <div className="grid grid-cols-2">
        <label
          className="block mb-2 text-lg font-semibold capitalize text-[#1d1853]">
          Education
        </label>
        <button
          id="new-edu-button"
          type="button"
          onClick={() => {
            eduAppend({
              school: "",
              startDate: new Date(),
              graduationDate: new Date(),
              additionalInfo: ""
            });
          }}> <BsPlusSquare size={24}/>
        </button>
      </div>

      {eduFields.map((field, index) => {
        return (
          <div className="my-8" key={field.id}>
            <div className="mb-4 grid grid-cols-2">
              <h1>Education {index + 1}</h1>
              <button id={`edu-remove-${index}`} type="button" onClick={() => eduRemove(index)}>
                <BsDashSquare size={24}/>
              </button>
            </div>
            
            <label className={labelClass}>
              School
            </label>
            <input id={`edu-school-${index}`} type="text" className={inputClass}
              {...register(`education.${index}.school`, { required: true,
                minLength: {value: 3, message: "School name must be atleast 3 characters long"} })}
              />
              { error && <p className='text-red-500 text-sm mt-2'>{ error?.education?.[index]?.school?.message }</p>}

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full group">
                <label className={labelClass}>
                  Start date
                </label>
                <input id={`edu-start-${index}`} type="date" className={inputClass}
                  {...register(`education.${index}.startDate`, { 
                    required: {value: true, message: "Valid start date must be provided"},
                    valueAsDate: true,
                    validate: (date: Date | string) => date <= new Date() || "Start date must be before today"
                  })}
                />
                { error && <p className='text-red-500 text-sm mt-2'>{ error?.education?.[index]?.startDate?.message }</p>}
              </div>
              <div className="relative z-0 w-full group">
                <label className={labelClass}>
                  End date
                </label>
                <input id={`edu-end-${index}`} type="date" className={inputClass}
                  {...register(`education.${index}.graduationDate`, { required: false })}
                />
              </div>
            </div>
            <label className={labelClass}>
              Additional information
            </label>
            <input id={`edu-info-${index}`} type="text" className={inputClass}
              {...register(`education.${index}.additionalInfo`, { required: false })}
            />
          </div>
        );
      })}
    </div>
  )
};

export default FormEducationField;