import { useAppSelector } from '../../hooks/dispatchHooks';

import NavItem from './NavItem';

const NavItems = () => {
  const user = useAppSelector(state => state.authentication);
  
  return (
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
  )
};

export default NavItems;