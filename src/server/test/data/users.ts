import { User } from "../../types";
import usersService from "../../services/usersService";

const getTestUsers = async (): Promise<Array<User>> => {
  const user1 = await usersService.createUser({
    firstName: "Henri",
    lastName: "Remonen",
    email: "henri@remonen.fi",
    password: "salainen",
    phoneNumber: "1231231234",
    address: "Kalevinrinne 420"
  });
  
  const user2 = await usersService.createUser({
    firstName: "Kalevi",
    lastName: "Kalvirinne",
    email: "k.kalvirinne@gmail.com",
    password: "salainen",
  });

  return [user1, user2];
}

export default getTestUsers;