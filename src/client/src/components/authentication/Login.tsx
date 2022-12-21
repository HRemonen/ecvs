import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/dispatchHooks";

import FormInput from "./FormInput";

import { loginUser } from "../../reducers/authReducer";
import { LoginZod } from "../../validators/zodValidators";

import clipboard from "../../assets/clipboard.webp";

import type { ValidatedLogin } from "@backend/utils/usersValidator";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState:{ errors } } = useForm<ValidatedLogin>({
    mode: "onBlur", resolver: zodResolver(LoginZod)
  });

  const onSubmit = async ({ email, password }: ValidatedLogin) => {
    void dispatch(loginUser(email, password));
    navigate('/');
  }
  
  return (
    <div className='grid grid-cols-2 h-screen min-h-screen'>
      <div className='flex flex-col justify-center text-left p-10 border-r-2 border-solid border-gray-300 shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className="md:max-w-sm">
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
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            label="Password"
            register={register}
            error={errors.password}
          />
          
          <button
            id="login-button"
            type="submit" 
            className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Login
          </button>
        </form>
        <p className="mt-4">
          Don&lsquo;t have an account? 
          <Link to="/register" className="ml-2 text-blue-600 inline-flex items-center font-medium hover:underline">Register here</Link>
        </p>
      </div>
      <div className="flex flex-col justify-center ">
          <img src={clipboard} alt="picture of a clipboard with checkmarks on items">
          </img>
      </div>
    </div>
  );
};

export default Login;