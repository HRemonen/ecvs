import express from 'express'
//import bcrypt from 'bcryptjs'
//import UserModel from '../models/user'
import { User } from "../types";
import ValidateNormalUser from "../utils/usersValidator"

const usersRouter = express.Router()

export type NewUserFields = Omit<User, "usertype" | "applications" | "ecvs" >;

usersRouter.post('/', async (request, response) => {
  const newUser: NewUserFields = ValidateNormalUser.parse(request.body)

  response.json(newUser)
});

export default usersRouter;
