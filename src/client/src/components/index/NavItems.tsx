import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAppSelector } from '../../hooks/dispatchHooks';

import Logout from '../authentication/Logout';

const NavItems = () => {
  const user = useAppSelector(state => state.authentication);

  const listItemStyle = "p-4 text-black hover:text-yellow-500";

  return (
    <>
      <li className={listItemStyle}>
        <NavLink to="/">Home</NavLink>
      </li>
      <li className={listItemStyle}>
        <HashLink smooth to="#about">About</HashLink>
      </li>
      <li className={listItemStyle}>
        <HashLink smooth to="#contact">Contact</HashLink>
      </li>
      <li className={listItemStyle}>
        <NavLink to='/postings'>Postings</NavLink>
      </li>
      {!user.token
        ? <>
            <li className={listItemStyle}>
              <NavLink to='/register'>Get started</NavLink>
            </li>
            <li className={listItemStyle}>
              <NavLink to='/login'>Login</NavLink>
            </li>
          </>
        : <>
            <li className={listItemStyle}>
              <NavLink to='/dashboard'>Dashboard</NavLink>
            </li>
            <Logout />
          </>
      }
    </>
  );
};

export default NavItems;