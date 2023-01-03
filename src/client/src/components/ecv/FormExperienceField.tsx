import { useFieldArray } from "react-hook-form";

import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import { inputWrapper, labelClass, inputClass } from "./NewEcvForm";

import { ExperienceFieldType } from "../../types";

const FormExperienceField: React.FC<ExperienceFieldType > = ({ error, control, register }) => {
  const { fields: expFields, append: expAppend, remove: expRemove } = useFieldArray({
    name: "experience", control});
  return (
    <div className={inputWrapper}>
      <div className="grid grid-cols-2">
        <label
          className="block mb-2 text-lg font-semibold capitalize text-[#1d1853]">
          Experience
        </label>

        <button
          id="new-exp-button"
          type="button"
          onClick={() => {
            expAppend({
              company: "",
              startDate: new Date(),
              endDate: new Date(),
              position: "",
              additionalInfo: ""
            });
          }}> <BsPlusSquare size={24}/>
        </button>
      </div>

      {expFields.map((field, index) => {
        return (
          <div className="my-8" key={field.id}>
            <div className="mb-4 grid grid-cols-2">
              <h1>Experience {index + 1}</h1>
              <button id={`exp-remove-${index}`} type="button" onClick={() => expRemove(index)}>
                <BsDashSquare size={24}/>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full group">
                <label className={labelClass}>
                  Company
                </label>
                <input id={`exp-company-${index}`} type="text" className={inputClass}
                  {...register(`experience.${index}.company`, { required: true,
                  minLength: {value: 3, message: "Company name must be atleast 3 characters long"} })}
                />
                { error && <p className='text-red-500 text-sm mt-2'>{ error?.experience?.[index]?.company?.message }</p>}
              </div>

              <div className="relative z-0 w-full group">
                <label className={labelClass}>
                  Position
                </label>
                <input id={`exp-position-${index}`} type="text" className={inputClass}
                  {...register(`experience.${index}.position`, { required: true,
                    minLength: {value: 3, message: "Position must be atleast 3 characters long"} })}
                />
                { error && <p className='text-red-500 text-sm mt-2'>{ error?.experience?.[index]?.position?.message }</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full group">
                <label className={labelClass}>
                  Start date
                </label>
                <input id={`exp-start-${index}`} type="date" className={inputClass}
                  {...register(`experience.${index}.startDate`, { 
                    required: {value: true, message: "Valid start date must be provided"},
                    valueAsDate: true,
                    validate: (date: Date | string) => date <= new Date() || "Start date must be before today"
                  })}
                />
                { error && <p className='text-red-500 text-sm mt-2'>{ error?.experience?.[index]?.startDate?.message }</p>}
              </div>
            
              <div className="relative z-0 w-full group">
                <label className={labelClass}>
                  End date
                </label>
                <input id={`exp-end-${index}`} type="date" className={inputClass}
                  {...register(`experience.${index}.endDate`)}
                />
              </div>
            </div>
            
            <label className={labelClass}>
              Additional information
            </label>
            <input id={`exp-info-${index}`} type="text" className={inputClass}
              {...register(`experience.${index}.additionalInfo`)}
            />
          </div>
        )})}
      </div>
  )
};

export default FormExperienceField;