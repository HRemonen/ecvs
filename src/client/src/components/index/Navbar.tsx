import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatchHooks';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

import NavItem from './NavItem';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authentication);

  const [nav, setNav] = useState(false);
  
  const handleNavChange = () => setNav(!nav);

  const renderMenuItems = () => (
    <>
      <NavItem content='Home' to='/' />
      <NavItem content='About' to='/about' />
      <NavItem content='Contact' to='/contact' />
      {!user
        ? <>
            <NavItem content='Get started' to='/register'/>
            <NavItem content='Login' to='/login' />
          </>
        : <>
            <NavItem content='User page' to='/userpage' />
            <NavItem content='Logout' to='/' />
          </>
      }
    </>
  );

  return (
    <div className="flex justify-between items-center h-24 max-w-[1080px] mx-auto px-4 text-black">
      <h1 className="w-full text-3xl font-bold text-black">Ecves</h1>
      <ul className="hidden md:flex">
        {renderMenuItems()}
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
          {renderMenuItems()}
        </ul>
      </div>
    </div>
  )
};

export default Navbar;