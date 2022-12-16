import { User, Ecv } from "@backend/types";

const UserEcvs: React.FC<{user: User & {id: string}}> = ({ user }) => {
  console.log(user)

  return (
    <div>
      <p> Heipä hei </p>
    </div>
  )
};

export default UserEcvs;
