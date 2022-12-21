import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/dispatchHooks";

import { createEcv } from "../../reducers/ecvReducer";

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

  const { fields: skillFields, append: skillAppend, remove: skillRemove } = useFieldArray({
    name: "skills", control});

  const { fields: hobbyFields, append: hobbyAppend, remove: hobbyRemove } = useFieldArray({
    name: "hobbies", control});

  const { fields: langFields, append: langAppend, remove: langRemove } = useFieldArray({
    name: "languages", control});

  const onSubmit = (data: ValidatedEcv) => {
    void dispatch(createEcv(data));
    navigate('/dashboard')
  };

  const inputWrapper = "p-4 text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow"
  const labelClass = "flex items-center p-3 text-base font-bold text-[#1d1853]"
  const propertyClass = "flex items-center p-3 text-base text-[#1d1853]"
  const inputClass = "block w-[70%] bg-transparent outline-none border-b-2 py-2 px-4 placeholder-gray-500 text-gray-900 border-gray-200"

  return (
    <div className='w-full max-w-2xl p-4 bg-white border rounded-lg shadow-md sm:p-6'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className={inputWrapper}>
          <div className="flex">
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
                  {...register(`experience.${index}.company`, { required: true })}
                />
                <label className={propertyClass}>
                  Position
                </label>
                <input id={`exp-position-${index}`} type="text" className={inputClass}
                  {...register(`experience.${index}.position`, { required: true })}
                />

                <div className="flex">
                  <label className={propertyClass}>
                    Start date
                  </label>
                  <input id={`exp-start-${index}`} type="date" className={inputClass}
                    {...register(`experience.${index}.startDate`, { required: true })}
                  />

                  <label className={propertyClass}>
                    End date
                  </label>
                  <input id={`exp-end-${index}`} type="date" className={inputClass}
                    {...register(`experience.${index}.endDate`, { required: false })}
                  />
                </div>
                
                <label className={propertyClass}>
                  Additional information
                </label>
                <input id={`exp-info-${index}`} type="text" className={inputClass}
                  {...register(`experience.${index}.additionalInfo`, { required: false })}
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

              
          <div className={inputWrapper}>
            <div className="flex">
              <label className={labelClass}>
                Skills
              </label>
              <button id="new-skill-button" type="button" onClick={() => {
                skillAppend(""); }}> New skill 
              </button>
            </div>
            {skillFields.map((field, index) => {
              return (
                <div className="flex" key={field.id}>
                  <label className={propertyClass}>
                    Skill # {index + 1}
                  </label>
                  <input id={`skill-${index}`} type="text" className={inputClass}
                    {...register(`skills.${index}`, { required: true })}
                  />
                  <button id={`skill-remove-${index}`} type="button" onClick={() => skillRemove(index)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>

          <div className={inputWrapper}>
            <div className="flex">
              <label className={labelClass}>
                Hobbies
              </label>
              <button id="new-hobby-button" type="button" onClick={() => {
                hobbyAppend(""); }}> New hobby 
              </button>
            </div>
            {hobbyFields.map((field, index) => {
              return (
                <div className="flex" key={field.id}>
                  <label className={propertyClass}>
                    Hobby # {index + 1}
                  </label>
                  <input id={`hobby-${index}`} type="text" className={inputClass}
                    {...register(`hobbies.${index}`, { required: true })}
                  />
                  <button id={`hobby-remove-${index}`} type="button" onClick={() => hobbyRemove(index)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>

          <div className={inputWrapper}>
            <div className="flex">
              <label className={labelClass}>
                Languages
              </label>
              <button id="new-lang-button" type="button" onClick={() => {
                langAppend(""); }}> New language 
              </button>
            </div>
            {langFields.map((field, index) => {
              return (
                <div className="flex" key={field.id}>
                  <label className={propertyClass}>
                    Language # {index + 1}
                  </label>
                  <input id={`lang-${index}`} type="text" className={inputClass}
                    {...register(`languages.${index}`, { required: true })}
                  />
                  <button id={`lang-remove-${index}`} type="button" onClick={() => langRemove(index)}>
                    Delete
                  </button>

                </div>
              );
            })}
          </div>

          <div className={inputWrapper}>
            <label
              className={labelClass}>
              Profile
            </label>
            <input id="profile" type="text" placeholder="Write something about yourself" className={inputClass}
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