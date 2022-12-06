import express from 'express'
//import bcrypt from 'bcryptjs'
//import UserModel from '../models/user'
import { User } from "../types";

const usersRouter = express.Router()

usersRouter.post('/', async (request, response) => {
  const newUser: User = await request.body;
  response.json(newUser)
});

export default usersRouter;
