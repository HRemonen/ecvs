import { useState } from 'react';
import { useAppDispatch } from '../../hooks/dispatchHooks';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

import NavItems from './NavItems';

const Navbar = () => {
  const dispatch = useAppDispatch();

  const [nav, setNav] = useState(false);
  
  const handleNavChange = () => setNav(!nav);

  return (
    <div className="flex justify-between items-center h-24 max-w-[1080px] mx-auto px-4 text-black">
      <h1 className="w-full text-3xl text-[#1d1853]">ecves</h1>
      <ul className="hidden md:flex">
        <NavItems />
      </ul>
      <div onClick={ handleNavChange } className="cursor-pointer block md:hidden">
        {!nav 
          ? <AiOutlineClose size={ 24 } /> 
          : <AiOutlineMenu size={ 24 } />}
      </div>
      <div className={!nav 
          ? 'md:hidden fixed left-0 top-0 h-full w-[50%] border-r bg-gray-100 border-r-gray-200 ease-in-out duration-500' 
          : 'fixed left-[-100%]'}>
        <ul className='pt-8 p-4 uppercase'>
          <NavItems />
        </ul>
      </div>
    </div>
  )
};

export default Navbar;