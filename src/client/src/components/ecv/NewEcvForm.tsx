import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/dispatchHooks";

import { createEcv } from "../../reducers/ecvReducer";

import WordField from "./WordField";

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
    console.log(data)
    void dispatch(createEcv(data)).catch(error => {
      console.log(error)
    });
    navigate('/dashboard')
  };

  const inputWrapper = "p-4 text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow"
  const labelClass = "flex items-center p-3 text-base font-bold text-[#1d1853]"
  const propertyClass = "flex items-center p-3 text-base text-[#1d1853]"
  const inputClass = "block w-[70%] bg-transparent outline-none border-b-2 py-2 px-4 placeholder-gray-500 text-gray-900 border-gray-200"

  return (
    <div className='w-full max-w-2xl p-4 bg-white border rounded-lg shadow-md sm:p-6'>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className={inputWrapper}>
          <div className="flex pb-4">
            <label
              className={labelClass}>
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
              }}> New experience
            </button>
          </div>
          {expFields.map((field, index) => {
            return (
              <div key={field.id}>
                <label className={propertyClass}>
                  Company
                </label>
                <input id={`exp-company-${index}`} type="text" className={inputClass}
                  {...register(`experience.${index}.company`, { required: true,
                  minLength: {value: 3, message: "Company name must be atleast 3 characters long"} })}
                />
                { errors && <p className='text-red-500 text-sm mt-2'>{errors?.experience?.[index]?.company?.message}</p>}
                <label className={propertyClass}>
                  Position
                </label>
                <input id={`exp-position-${index}`} type="text" className={inputClass}
                  {...register(`experience.${index}.position`, { required: true,
                    minLength: {value: 3, message: "Position must be atleast 3 characters long"} })}
                />
                { errors && <p className='text-red-500 text-sm mt-2'>{errors?.experience?.[index]?.position?.message}</p>}

                <div className="flex">
                  <label className={propertyClass}>
                    Start date
                  </label>
                  <input id={`exp-start-${index}`} type="date" className={inputClass}
                    {...register(`experience.${index}.startDate`, { 
                      required: {value: true, message: "Valid start date must be provided"},
                      valueAsDate: true,
                      validate: date => date <= new Date() || "Start date must be before today"
                    })}
                  />
                  { errors && <p className='text-red-500 text-sm mt-2'>{errors?.experience?.[index]?.startDate?.message}</p>}

                  <label className={propertyClass}>
                    End date
                  </label>
                  <input id={`exp-end-${index}`} type="date" className={inputClass}
                    {...register(`experience.${index}.endDate`)}
                  />
                </div>
                
                <label className={propertyClass}>
                  Additional information
                </label>
                <input id={`exp-info-${index}`} type="text" className={inputClass}
                  {...register(`experience.${index}.additionalInfo`)}
                />

                <button id={`exp-remove-${index}`} type="button" onClick={() => expRemove(index)}>
                  Delete
                </button>
              </div>
            )})}
          </div>

          <div className={inputWrapper}>
            <div className="flex">
              <label
                className={labelClass}>
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
                }}> New education
              </button>
            </div>

            {eduFields.map((field, index) => {
              return (
                <section key={field.id}>
                  <label className={propertyClass}>
                    School
                  </label>
                  <input id={`edu-school-${index}`} type="text" className={inputClass}
                    {...register(`education.${index}.school`, { required: true })}
                  />

                  <div className="flex">
                    <label className={propertyClass}>
                      Start date
                    </label>
                    <input id={`edu-start-${index}`} type="date" className={inputClass}
                      {...register(`education.${index}.startDate`, { required: true })}
                    />

                    <label className={propertyClass}>
                      End date
                    </label>
                    <input id={`edu-end-${index}`} type="date" className={inputClass}
                      {...register(`education.${index}.graduationDate`, { required: false })}
                    />
                  </div>
                  
                  <label className={propertyClass}>
                    Additional information
                  </label>
                  <input id={`edu-info-${index}`} type="text" className={inputClass}
                    {...register(`education.${index}.additionalInfo`, { required: false })}
                  />

                  <button id={`edu-remove-${index}`} type="button" onClick={() => eduRemove(index)}>
                    Delete
                  </button>
                </section>
              );
            })}
          </div>    
          <WordField
            label="skills"
            control={control}
            register={register}
          />

          <WordField
            label="hobbies"
            control={control}
            register={register}
          />

          <WordField
            label="languages"
            control={control}
            register={register}
          />

          <div className={inputWrapper}>
            <label
              className={labelClass}>
              Profile
            </label>
            <textarea id="profile" placeholder="Write something about yourself" className={inputClass}
              {...register("profile")}
            />
          </div>
          
          <button id="submit-form-button" type="submit"> Submit </button>
        </form>
      </div>
    </div>
  )
};

export default NewEcvForm;