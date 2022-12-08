import bcrypt from 'bcryptjs';
import { HydratedDocument } from "mongoose";
import { User, UserType } from "../types";
import { ValidatedUser } from '../utils/usersValidator';
import UserModel from '../models/user';


const getUsers = async (): Promise<User[]> => {
  const users = await UserModel
    .find({})
    .populate('ecvs')
  return users;
};

const createUser = async (newUser: ValidatedUser): Promise<User> => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds); 

  const user: HydratedDocument<User> = new UserModel({
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