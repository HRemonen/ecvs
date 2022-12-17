import { useForm, useFieldArray } from "react-hook-form";

const NewEcvForm = () => {
  const { register, handleSubmit, control } = useForm();
  const { fields: eduFields, append: eduAppend, remove: eduRemove } = useFieldArray({
    name: "education", control});
  
  const { fields: expFields, append: expAppend, remove: expRemove } = useFieldArray({
    name: "experience", control});

  const onSubmit = (data: any) => {
    console.log(data)
  };

  const inputWrapper = "text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow"
  const labelClass = "flex items-center p-3 text-base font-bold"
  const inputClass = "block w-full bg-transparent outline-none border-b-2 py-2 px-4 placeholder-gray-500 text-gray-900 border-gray-200"

  return (
    <div className='w-full max-w-2xl p-4 bg-white border rounded-lg shadow-md sm:p-6'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className={inputWrapper}>
            <label
              className={labelClass}>
              Experience
            </label>
            <button
              type="button"
              onClick={() => {
                expAppend({
                  company: "",
                  startDate: Date,
                  endDate: Date,
                  position: "",
                  additionalInfo: ""
                });
              }}> New experience
            </button>

            {expFields.map((field, index) => {
              return (
                <section key={field.id}>
                  <label className={labelClass}>
                    Company
                  </label>
                  <input type="text" className={inputClass}
                    {...register(`experience.${index}.company`, { required: true })}
                  />

                  <label className={labelClass}>
                    Start date
                  </label>
                  <input type="date" className={inputClass}
                    {...register(`experience.${index}.startDate`, { required: true })}
                  />

                  <label className={labelClass}>
                    End date
                  </label>
                  <input type="date" className={inputClass}
                    {...register(`experience.${index}.endDate`, { required: false })}
                  />

                  <label className={labelClass}>
                    Position
                  </label>
                  <input type="text" className={inputClass}
                    {...register(`experience.${index}.position`, { required: true })}
                  />

                  <label className={labelClass}>
                    Additional information
                  </label>
                  <input type="text" className={inputClass}
                    {...register(`experience.${index}.additionalInfo`, { required: false })}
                  />

                  <button type="button" onClick={() => expRemove(index)}>
                    Delete
                  </button>
                </section>
              );
            })}
          </div>

          <div className={inputWrapper}>
            <label
              className={labelClass}>
              Education
            </label>
            <button
              type="button"
              onClick={() => {
                eduAppend({
                  school: "",
                  startDate: Date,
                  endDate: Date,
                  additionalInfo: ""
                });
              }}> New education
            </button>

            {eduFields.map((field, index) => {
              return (
                <section key={field.id}>
                  <label className={labelClass}>
                    School
                  </label>
                  <input type="text" className={inputClass}
                    {...register(`education.${index}.school`, { required: true })}
                  />

                  <label className={labelClass}>
                    Start date
                  </label>
                  <input type="date" className={inputClass}
                    {...register(`education.${index}.startDate`, { required: true })}
                  />

                  <label className={labelClass}>
                    End date
                  </label>
                  <input type="date" className={inputClass}
                    {...register(`education.${index}.endDate`, { required: false })}
                  />

                  <label className={labelClass}>
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
            <label
              className={labelClass}>
              Skills
            </label>
            <input type="text" className={inputClass}
              {...register("skills")}
            />
          </div>

          <div className={inputWrapper}>
            <label
              className={labelClass}>
              Hobbies
            </label>
            <input type="text" className={inputClass}
              {...register("hobbies")}
            />
          </div>

          <div className={inputWrapper}>
            <label
              className={labelClass}>
              Languages
            </label>
            <input type="text" className={inputClass}
              {...register("languages")}
            />
          </div>

          <div className={inputWrapper}>
            <label
              className={labelClass}>
              Profile
            </label>
            <input type="text" className={inputClass}
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