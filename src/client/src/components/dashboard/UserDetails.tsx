import { MdOutlineLocationOn } from 'react-icons/md';

import Profile from '../../assets/default_profile.svg';

import type { User } from "@backend/types";

const UserDetails: React.FC<{user: User & {id: string}}> = ({ user }) => (
    <div className="hidden md:block text-center items-center">
      <img 
        className="inline-block object-scale-down h-24 w-24 md:h-64 md:w-64 m-4 md:mt-[-48px]" 
        src={Profile} alt="Profile picture of the user"
      />
      <div className='inline-block text-left ml-auto'>
        <h1 className='text-gray-800 font-semibold md:text-3xl'>{ user.firstName } { user.lastName }</h1>
        <h1 className='text-gray-400'>{ user.email }</h1>
        { user.address 
          ? <p className='flex mt-4'> <MdOutlineLocationOn size={ 24 } /> { user.address } </p>
          : null 
        }
      </div>
    </div>
  );

export default UserDetails;