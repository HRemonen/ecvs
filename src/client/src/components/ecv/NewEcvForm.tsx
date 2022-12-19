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
  const inputClass = "block w-full bg-transparent outline-none border-b-2 py-2 px-4 placeholder-gray-500 text-gray-900 border-gray-200"

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
                <input type="text" className={inputClass}
                  {...register(`experience.${index}.company`, { required: true })}
                />
                <label className={propertyClass}>
                  Position
                </label>
                <input type="text" className={inputClass}
                  {...register(`experience.${index}.position`, { required: true })}
                />

                <div className="flex">
                  <label className={propertyClass}>
                    Start date
                  </label>
                  <input type="date" className={inputClass}
                    {...register(`experience.${index}.startDate`, { required: true })}
                  />

                  <label className={propertyClass}>
                    End date
                  </label>
                  <input type="date" className={inputClass}
                    {...register(`experience.${index}.endDate`, { required: false })}
                  />
                </div>
                
                <label className={propertyClass}>
                  Additional information
                </label>
                <input type="text" className={inputClass}
                  {...register(`experience.${index}.additionalInfo`, { required: false })}
                />

                <button type="button" onClick={() => expRemove(index)}>
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
                  <input type="text" className={inputClass}
                    {...register(`education.${index}.school`, { required: true })}
                  />

                  <div className="flex">
                    <label className={propertyClass}>
                      Start date
                    </label>
                    <input type="date" className={inputClass}
                      {...register(`education.${index}.startDate`, { required: true })}
                    />

                    <label className={propertyClass}>
                      End date
                    </label>
                    <input type="date" className={inputClass}
                      {...register(`education.${index}.graduationDate`, { required: false })}
                    />
                  </div>
                  
                  <label className={propertyClass}>
                    Additional information
                  </label>
                  <input type="text" className={inputClass}
                    {...register(`education.${index}.additionalInfo`, { required: false })}
                  />

                  <button type="button" onClick={() => eduRemove(index)}>
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
              <button type="button" onClick={() => {
                skillAppend(""); }}> New skill 
              </button>
            </div>
            
            {skillFields.map((field, index) => {
              return (
                <div key={field.id}>
                  <label className={propertyClass}>
                    Skill # {index + 1}
                  </label>

                  <div className="flex">
                    <input type="text" className={inputClass}
                      {...register(`skills.${index}`, { required: true })}
                    />
                    <button type="button" onClick={() => skillRemove(index)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={inputWrapper}>
            <div className="flex">
              <label className={labelClass}>
                Hobbies
              </label>
              <button type="button" onClick={() => {
                hobbyAppend(""); }}> New hobby 
              </button>
            </div>
            {hobbyFields.map((field, index) => {
              return (
                <div key={field.id}>
                  <label className={propertyClass}>
                    Hobby # {index + 1}
                  </label>

                  <div className="flex">
                    <input type="text" className={inputClass}
                      {...register(`hobbies.${index}`, { required: true })}
                    />
                    <button type="button" onClick={() => hobbyRemove(index)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={inputWrapper}>
            <div className="flex">
              <label className={labelClass}>
                Languages
              </label>
              <button type="button" onClick={() => {
                langAppend(""); }}> New language 
              </button>
            </div>
            {langFields.map((field, index) => {
              return (
                <div key={field.id}>
                  <label className={propertyClass}>
                    Language # {index + 1}
                  </label>

                  <div className="flex">
                    <input type="text" className={inputClass}
                      {...register(`languages.${index}`, { required: true })}
                    />
                    <button type="button" onClick={() => langRemove(index)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={inputWrapper}>
            <label
              className={labelClass}>
              Profile
            </label>
            <input type="text" placeholder="Write something about yourself" className={inputClass}
              {...register("profile")}
            />
          </div>
          
          <button type="submit"> Submit </button>
        </form>
      </div>
    </div>
  )
};

export default NewEcvForm;