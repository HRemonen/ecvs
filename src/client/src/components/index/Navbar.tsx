import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import NavItems from './NavItems';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  
  const handleNavChange = () => setNav(!nav); 
  return (
    <div className="flex justify-between items-center h-24 max-w-[1080px] mx-auto px-4">
      <h1 className='text-[#1d1853] font-Satisfy text-4xl hover:blur-sm drop-shadow-xl'>Ecves</h1>
      <ul className="hidden md:flex">
        <NavItems />
      </ul>
      <div onClick={ handleNavChange } className="cursor-pointer block md:hidden">
        {nav 
          ? <AiOutlineClose size={ 24 } /> 
          : <AiOutlineMenu size={ 24 } />}
      </div>
      <div className={nav 
          ? 'md:hidden z-50 fixed left-0 top-0 h-full w-[50%] border-r bg-gray-100 border-r-gray-200 ease-in-out duration-500' 
          : 'fixed left-[-100%]'}>
        <ul className='pt-8 p-4 uppercase'>
          <NavItems />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;