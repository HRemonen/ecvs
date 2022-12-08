import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user';
import { Login } from '../types';

const loginUser = async (loginRequest: Login): Promise<string | undefined> => {
  let token;

  const user = await UserModel.findOne({ email: loginRequest.email })
  const loginSuccess = user === null
    ? false
    : await bcrypt.compare(loginRequest.password, user.password)

  if (user && loginSuccess) {
    const tokenUser = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      id: user.id
    }

    token = jwt.sign(tokenUser, process.env.SECRET as string, {expiresIn: '2 days'})
  } 

  return token;
}

export default loginUser;