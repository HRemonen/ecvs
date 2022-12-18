import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/dispatchHooks";

import { loginUser } from "../../reducers/authReducer";
import { LoginZod } from "../../validators/zodValidators";

import type { ValidatedLogin } from "@backend/utils/usersValidator";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState:{ errors } } = useForm<ValidatedLogin>({
    mode: "onBlur", resolver: zodResolver(LoginZod)
  });

  const onSubmit = async ({ email, password }: ValidatedLogin) => {
    void dispatch(loginUser(email, password));
    navigate('/')
  }
  
  return (
    <div className='grid h-screen place-items-center py-20 px-10 min-h-screen'>
      <div className='w-4/5 md:max-w-lg p-10 border border-cyan-400 rounded-lg shadow-lg bg-cyan-600'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-8'>
            <label 
              className={`block font-bold text-sm mb-2 ${
                errors.email ? "text-red-400" : "text-cyan-400"
              }`}>
              Email
            </label>
            <input 
              type="text"
              placeholder="hey@ecves.com"
              className={
                `block w-full bg-transparent outline-none border-b-2 py-2 px-4
              placeholder-cyan-500 focus:bg-cyan-600 
                ${
                  errors.email
                    ? "text-red-300 border-red-400"
                    : "text-cyan-200 border-cyan-400"
                }`
              }
              {...register("email")} 
            />
            <p className='text-red-500 text-sm mt-2'>{errors.email?.message}</p>
          </div>
          
          <div className="mb-8">
            <label
              className={`block font-bold text-sm mb-2 ${
                errors.password ? "text-red-400" : "text-cyan-400"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              className={
                `block w-full bg-transparent outline-none border-b-2 py-2 px-4
               text-cyan-200 focus:bg-cyan-600 placeholder-cyan-500 
               ${
                errors.password ? "border-red-400" : "border-cyan-400"
              }`
            }
            {...register("password")} 
            />
            <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>
          </div>
          
          <button 
            type="submit" 
            className="inline-block bg-yellow-500 text-yellow-800 rounded shadow py-2 px-5 text-sm hover:bg-cyan-600 hover:text-yellow-500 hover:border hover:border-yellow-500">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;