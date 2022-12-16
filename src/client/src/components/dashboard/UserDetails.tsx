import { User } from "@backend/types";

import { MdOutlineLocationOn, MdPhoneIphone,
  MdDynamicForm, MdFactCheck } from 'react-icons/md';

const UserDetails: React.FC<{user: User & {id: string}}> = ({ user }) => {
  return (
    <div>
      <h1>{ user.firstName } { user.lastName }</h1>
      <h1>{ user.email }</h1>
      <p>
        { user.address ? <MdOutlineLocationOn size={ 24 } /> && user.address : null }
      </p>
      <p>
        { user.phoneNumber? <MdPhoneIphone size={ 24 } /> && user.phoneNumber : null }
      </p>
      <p>
        <MdFactCheck size={ 24 } />{user.applications.length} applications
      </p>
      <p>
        <MdDynamicForm size={ 24 } /> {user.ecvs.length} ecvs
      </p>
    </div>
  )
};

export default UserDetails;