import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/dispatchHooks";

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
      <div className='flex flex-col justify-center text-left md:max-w-lg p-10 border-r-2 border-solid border-gray-300 shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-8'>
            <label 
              className="block mb-2 font-semibold text-gray-900 md:text-xl">
              Email
            </label>
            <input 
              type="text"
              placeholder="hello@ecves.com"
              className={
                `block w-full bg-transparent outline-none border-b-2 py-2 px-4
              placeholder-gray-500 
                ${
                  errors.email
                    ? "text-red-400 border-red-500"
                    : "border-gray-400"
                }`
              }
              {...register("email")} 
            />
            <p className='text-red-500 text-sm mt-2'>{errors.email?.message}</p>
          </div>
          
          <div className="mb-8">
            <label
              className="block mb-2 font-semibold text-gray-900 md:text-xl"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              className={
                `block w-full bg-transparent outline-none border-b-2 py-2 px-4
               placeholder-gray-500 
               ${
                errors.password
                  ? "text-red-400 border-red-500"
                  : "border-gray-400"
              }`
            }
            {...register("password")} 
            />
            <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>
          </div>
          
          <button 
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
          <img src={clipboard}>
          </img>
      </div>
    </div>
  );
};

export default Login;