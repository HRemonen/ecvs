import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user';
import { ValidatedLogin } from '../utils/usersValidator';

export interface Token {
  token: string | undefined;
  user: {name: string; email: string; id: string;} | undefined
}

const loginUser = async (userdata: ValidatedLogin): Promise<Token> => {
  let token;
  let tokenUser;

  const user = await UserModel.findOne({ email: userdata.email })
  const loginSuccess = user === null
    ? false
    : await bcrypt.compare(userdata.password, user.password);

  if (user && loginSuccess) {
    tokenUser = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      id: user.id
    };

    token = jwt.sign(tokenUser, process.env.SECRET as string, {expiresIn: '2 days'});
  }

  return { token, user: tokenUser };
}

export default { loginUser };