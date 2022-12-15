import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/dispatchHooks";

import { loginUser } from "../../reducers/authReducer";

import { LoginZod, ValidatedLogin } from "../../validators/usersValidator";

const Login = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState:{ errors } } = useForm<ValidatedLogin>({
    mode: "onBlur", resolver: zodResolver(LoginZod)
  });

  const onSubmit = async ({ email, password }: ValidatedLogin) => dispatch(loginUser(email, password));

  return (
    <div className='grid h-screen place-items-center py-20 px-10 min-h-screen'>
      <div className='w-4/5 md:max-w-lg p-10 border border-purple-400 rounded-lg shadow-lg bg-purple-600'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-8'>
            <label 
              htmlFor="email"
              className={`block font-bold text-sm mb-2 ${
                errors.email ? "text-red-400" : "text-purple-400"
              }`}>
              Email
            </label>
            <input 
              type="text"
              id="email"
              placeholder="hey@ecves.com"
              className={
                `block w-full bg-transparent outline-none border-b-2 py-2 px-4
              placeholder-purple-500 focus:bg-purple-600 
                ${
                  errors.email
                    ? "text-red-300 border-red-400"
                    : "text-purple-200 border-purple-400"
                }`
              }
              {...register("email")} />
            <p className='text-red-500 text-sm mt-2'>{errors.email?.message}</p>
          </div>
          
          <div className="mb-8">
            <label
              htmlFor="password"
              className={`block font-bold text-sm mb-2 ${
                errors.password ? "text-red-400" : "text-purple-400"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-purple-200 focus:bg-purple-600 placeholder-purple-500 ${
                errors.password ? "border-red-400" : "border-purple-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="inline-block bg-yellow-500 text-yellow-800 rounded shadow py-2 px-5 text-sm">
            Login
          </button>
        </form>
      </div>
      
    </div>
    
  );
};

export default Login;