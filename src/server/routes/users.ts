import express from 'express';

import UserModel from '../models/user';
import { UserZod } from "../utils/usersValidator";
import usersService from "../services/usersService";

const usersRouter = express.Router();

usersRouter.get('/', async (_request, response) => {
  const users = await usersService.getUsers();
  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const parsedUser = UserZod.safeParse(request.body);
  
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

  const savedUser = await usersService.createUser(newUser);

  return response.status(201).json(savedUser);
});

export default usersRouter;
