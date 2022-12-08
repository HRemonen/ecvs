import express from 'express';
import { LoginZod } from '../utils/usersValidator';
import loginService from '../services/loginService';

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
  const parsedLogin = LoginZod.safeParse(request.body);

  if (!parsedLogin.success) {
    return response.status(400).json(parsedLogin.error);
  }

  const userdata = parsedLogin.data;

  const token = await loginService.loginUser(userdata);

  if (!token || !token.token || !token.user) {
    return response.status(401).json({
      error: 'Wrong credentials, check input fields'
    });
  }
  return response.status(200).send(token);
});

export default loginRouter;