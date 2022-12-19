import { MdOutlineLocationOn, MdPhoneIphone,MdFactCheck } from 'react-icons/md';

import Profile from '../../assets/default_profile.svg';

import type { User } from "@backend/types";

const UserDetails: React.FC<{user: User & {id: string}}> = ({ user }) => {
  return (
    <div className="text-center items-center border-r border-r-gray-200">
      <img 
        className="inline-block object-scale-down h-20 w-20 md:h-48 md:w-48 m-4" 
        src={Profile} alt="Profile picture of the user"
      />
      <h1>{ user.firstName } { user.lastName }</h1>
      <h1>{ user.email }</h1>
      { user.address 
        ? <p className='flex justify-center'> <MdOutlineLocationOn size={ 24 } /> { user.address } </p>
        : null 
      }
      { user.phoneNumber 
        ? <p className='flex justify-center'> <MdPhoneIphone size={ 24 } /> { user.phoneNumber } </p> 
        : null 
      }
      <p className='flex justify-center'>
        <MdFactCheck className="mr-2" size={ 24 } />
        {user.applications.length} applications · {user.ecvs.length} ecvs
      </p>
    </div>
  )
};

export default UserDetails;