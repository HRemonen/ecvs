import { User } from "../types";
import UserModel from '../models/user';

const getUsers = async (): Promise<User[]> => {
  const users = await UserModel
    .find({});
  return users;
};

export default { getUsers };