import bcrypt from 'bcryptjs';
import { User, UserType } from "../types";
import UserModel from '../models/user';

export type NewUserFields = Omit<User, "usertype" | "applications" | "ecvs" >;

const getUsers = async (): Promise<User[]> => {
  const users = await UserModel
    .find({})
  return users;
};

const createUser = async (newUser: NewUserFields): Promise<User> => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds); 

  const user = new UserModel({
    usertype: UserType.NormalUser,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: passwordHash,
    phoneNumber: newUser.phoneNumber ?? "",
    address: newUser.address ?? "",
    ecvs: [],
    applications: []
  });

  const createdUser = await user.save();

  return createdUser;
};

export default { getUsers, createUser };