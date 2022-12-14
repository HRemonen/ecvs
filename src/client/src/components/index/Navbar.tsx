import { useState } from 'react';
import {AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  
  const handleNavChange = () => setNav(!nav);

  return (
    <div className="flex justify-between items-center h-24 max-w-[1080px] mx-auto px-4 text-black">
      <h1 className="w-full text-3xl font-bold text-black">Ecves</h1>
      <ul className="hidden md:flex">
        <li className="p-4">About</li>
        <li className="p-4">Home</li>
        <li className="p-4">Contact</li>
        <li className="p-4">Login</li>
        <li className="p-4">Get started</li>
      </ul>
      <div onClick={ handleNavChange } className="cursor-pointer block md:hidden">
        {!nav 
          ? <AiOutlineClose size={ 24 } /> 
          : <AiOutlineMenu size={ 24 }/>}
      </div>
      <div className={!nav 
          ? 'md:hidden fixed left-0 top-0 h-full w-[50%] border-r bg-gray-100 border-r-gray-200 ease-in-out duration-500' 
          : 'fixed left-[-100%]'}>
        <ul className='pt-8 p-4 uppercase'>
          <li className="p-4 border-b border-b-gray-400">About</li>
          <li className="p-4 border-b border-b-gray-400">Home</li>
          <li className="p-4 border-b border-b-gray-400">Contact</li>
          <li className="p-4 border-b border-b-gray-400">Login</li>
          <li className="p-4">Get started</li>
        </ul>
      </div>
    </div>
  )
};

export default Navbar;