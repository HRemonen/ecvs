import express from 'express';
import bcrypt from 'bcryptjs';
import { User, UserType } from "../types";
import UserModel from '../models/user';
import ValidateNormalUser from "../utils/usersValidator";
import usersService from "../services/usersService";

const usersRouter = express.Router();

export type NewUserFields = Omit<User, "usertype" | "applications" | "ecvs" >;

usersRouter.get('/', async (_request, response) => {
  const users = await usersService.getUsers();
  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const parsedUser = ValidateNormalUser.safeParse(request.body);
  
  if (!parsedUser.success) {
    return response.status(400).json(parsedUser.error);
  }

  const newUser = parsedUser.data;

  const foundUser = await UserModel.findOne({ "email": newUser.email });
  if (foundUser) {
    return response.status(400).json({
      error: "Email already in use by another user"
    });
  }

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

  return response.status(201).json(savedUser);
});

export default usersRouter;
