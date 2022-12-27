import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/dispatchHooks";

import { createEcv } from "../../reducers/ecvReducer";

import FormWordField from "./FormWordField";

import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import { ValidatedEcv } from "@backend/utils/ecvsValidator";

const NewEcvForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState:{ errors } } = useForm({
    mode: "onBlur"
  });

  const { fields: eduFields, append: eduAppend, remove: eduRemove } = useFieldArray({
    name: "education", control});
  
  const { fields: expFields, append: expAppend, remove: expRemove } = useFieldArray({
    name: "experience", control});

  const onSubmit = (data: ValidatedEcv) => {
    try {
      void dispatch(createEcv(data));
      navigate('/dashboard');
    } catch(error) {
      console.log(error);
    }
  };

  const inputWrapper = "p-4 text-gray-900 group"
  const labelClass = "block mb-2 text-sm font-medium text-[#1d1853]"
  const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

  return (
    <div className='w-full max-w-2xl p-4 bg-white border rounded-lg shadow-md sm:p-6'>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    { errors && <p className='text-red-500 text-sm mt-2'>{ errors?.experience?.[index]?.company?.message }</p>}
                  </div>
                  <div className="relative z-0 w-full group">
                    <label className={labelClass}>
                      Position
                    </label>
                    <input id={`exp-position-${index}`} type="text" className={inputClass}
                      {...register(`experience.${index}.position`, { required: true,
                        minLength: {value: 3, message: "Position must be atleast 3 characters long"} })}
                    />
                    { errors && <p className='text-red-500 text-sm mt-2'>{ errors?.experience?.[index]?.position?.message }</p>}
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
                        validate: date => date <= new Date() || "Start date must be before today"
                      })}
                    />
                    { errors && <p className='text-red-500 text-sm mt-2'>{ errors?.experience?.[index]?.startDate?.message }</p>}
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
                    { errors && <p className='text-red-500 text-sm mt-2'>{ errors?.education?.[index]?.school?.message }</p>}

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full group">
                      <label className={labelClass}>
                        Start date
                      </label>
                      <input id={`edu-start-${index}`} type="date" className={inputClass}
                        {...register(`education.${index}.startDate`, { 
                          required: {value: true, message: "Valid start date must be provided"},
                          valueAsDate: true,
                          validate: date => date <= new Date() || "Start date must be before today"
                        })}
                      />
                      { errors && <p className='text-red-500 text-sm mt-2'>{ errors?.education?.[index]?.startDate?.message }</p>}
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

          <FormWordField
            label="skills"
            control={control}
            register={register}
          />

          <FormWordField
            label="hobbies"
            control={control}
            register={register}
          />

          <FormWordField
            label="languages"
            control={control}
            register={register}
          />

          <div className={inputWrapper}>
            <label
              className="block mb-2 text-lg font-semibold capitalize text-[#1d1853]">
              Profile
            </label>
            <textarea id="profile" placeholder="Write something about yourself" className={inputClass}
              {...register("profile")}
            />
          </div>

          <button
              id="submit-form-button"
              type="submit" 
              className="inline-block mt-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Save
            </button>
        </form>
      </div>
    </div>
  )
};

export default NewEcvForm;