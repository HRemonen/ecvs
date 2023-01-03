import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/dispatchHooks";

import FormInput from "./FormInput";

import { loginUser } from "../../reducers/authReducer";

import clipboard from "../../assets/clipboard.webp";

import type { ValidatedLogin } from "@backend/utils/usersValidator";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setError, register, handleSubmit, formState:{ errors } } = useForm<ValidatedLogin>({
    mode: "onBlur"
  });

  const onSubmit = async ({ email, password }: ValidatedLogin) => {
    try {
      await dispatch(loginUser(email, password))
      navigate('/')
    } catch(error) {
      console.log(error);
      setError('email', {type: 'custom', message: 'Invalid email or password'});
      setError('password', {type: 'custom', message: 'Invalid email or password'});
    }
  }
  
  return (
    <div className='md:grid md:grid-cols-2 text-center'>
      <div className='flex flex-col h-screen justify-center text-center items-center p-12 border-r-2 border-solid border-gray-300 md:shadow-lg'>
        <h1 className='text-[#1d1853] mx-auto mb-12 font-Satisfy text-6xl hover:blur-sm drop-shadow-xl'>Ecves</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center text-left">
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
      <div className="invisible md:visible flex flex-col justify-center ">
        <img src={clipboard} alt="picture of a clipboard with checkmarks on items">
        </img>
      </div>
    </div>
  );
};

export default Login;