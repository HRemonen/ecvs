import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/dispatchHooks";

import { createUser } from "../../reducers/userReducer";

import FormInput from "./FormInput";

import { UserZod } from "../../validators/zodValidators";

import type { ValidatedUser } from "@backend/utils/usersValidator";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState:{ errors } } = useForm<ValidatedUser>({
    mode: "onBlur", resolver: zodResolver(UserZod)
  });
  
  const onSubmit = (data: ValidatedUser) => {
    dispatch(createUser(data));
    navigate('/login')
  }
  
  return (
    <div className='grid grid-cols-2 h-screen min-h-screen'>
      <div className="flex flex-col justify-center ">
        <img src={""} alt="picture of a clipboard with checkmarks on items">
      </img>
      </div>
      <div className='flex flex-col justify-center text-left p-10 border-l-2 border-solid border-gray-300 shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className="md:max-w-sm">
          <FormInput
            id="firstName"
            type="text"
            placeholder="Uncle"
            name="firstName"
            label="First name"
            register={register}
            error={errors.firstName}
          />

          <FormInput
            id="lastName"
            type="text"
            placeholder="Bob"
            name="lastName"
            label="Last name"
            register={register}
            error={errors.lastName}
          />

          <FormInput
            id="email"
            type="email"
            placeholder="hello@ecves.com"
            name="email"
            label="Email"
            register={register}
            error={errors.email}
          />

          <FormInput
            id="phoneNumber"
            type="text"
            placeholder="+358 123 1234"
            name="phoneNumber"
            label="Phone number"
            register={register}
            error={errors.phoneNumber}
          />

          <FormInput
            id="address"
            type="text"
            placeholder="Example street 20"
            name="address"
            label="Address"
            register={register}
            error={errors.address}
          />
          
          <FormInput
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            label="Password"
            register={register}
            error={errors.password}
          />
          
          <button
            id="register-button"
            type="submit" 
            className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Register
          </button>
        </form>
        <p className="mt-4">
          Already have an account? 
          <Link to="/login" className="ml-2 text-blue-600 inline-flex items-center font-medium hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );

};

export default Register;