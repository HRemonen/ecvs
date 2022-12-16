import { useAppSelector } from '../../hooks/dispatchHooks';

import NavItem from './NavItem';
import Logout from '../authentication/Logout';

const NavItems = () => {
  const user = useAppSelector(state => state.authentication);

  return (
    <>
      <NavItem content='Home' to='/' />
      <NavItem content='About' to='/about' />
      <NavItem content='Contact' to='/contact' />
      {!user.token
        ? <>
            <NavItem content='Get started' to='/register'/>
            <NavItem content='Login' to='/login' />
          </>
        : <>
            <NavItem content='Dashboard' to='/dashboard' />
            <Logout />
          </>
      }
    </>
  );
};

export default NavItems;