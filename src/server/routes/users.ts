import express from 'express';
import bcrypt from 'bcryptjs';
import { User, UserType } from "../types";
import UserModel from '../models/user';
import ValidateNormalUser from "../utils/usersValidator";

const usersRouter = express.Router();

export type NewUserFields = Omit<User, "usertype" | "applications" | "ecvs" >;

usersRouter.post('/', async (request, response) => {
  const newUser: NewUserFields = ValidateNormalUser.parse(request.body);
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

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

export default usersRouter;
