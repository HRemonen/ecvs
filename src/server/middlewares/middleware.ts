import jwt, { JwtPayload } from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import UserModel from '../models/user';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  user: string | null;
}

export const userExtractor = async (request: Request, _response: Response, next: NextFunction): Promise<void> => {
  const auth = request.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const token = jwt.verify(auth.substring(7), process.env.SECRET as string);
    (request as CustomRequest).token = token;

    if (token) {
      (request as CustomRequest).user = await UserModel.findById((token as JwtPayload).id);
    }
  }
  next()
};