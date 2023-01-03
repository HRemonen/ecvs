import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/dispatchHooks";

import { createEcv } from "../../reducers/ecvReducer";

import FormWordField from "./FormWordField";
import FormExperienceField from "./FormExperienceField";
import FormEducationField from "./FormEducationField";

import { ValidatedEcv } from "@backend/utils/ecvsValidator";

export const inputWrapper = "p-4 text-gray-900 group"
export const labelClass = "block mb-2 text-md capitalize"
export const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

const NewEcvForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState:{ errors } } = useForm({
    mode: "onBlur"
  });

  const onSubmit = (data: ValidatedEcv) => {
    try {
      void dispatch(createEcv(data));
      navigate('/dashboard');
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full max-w-2xl p-4 bg-white border rounded-lg shadow-md sm:p-6'>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>

          <FormExperienceField
            error={errors}
            control={control}
            register={register}
          />

          <FormEducationField
            error={errors}
            control={control}
            register={register}
          />

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
              Submit
            </button>
        </form>
      </div>
    </div>
  )
};

export default NewEcvForm;