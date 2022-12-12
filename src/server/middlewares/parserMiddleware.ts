import {Request, Response, NextFunction} from 'express';
import EcvZod from '../utils/ecvsValidator';

export const ecvExtractor = async (request: Request, response: Response, next: NextFunction) => {
  const parsedEcv = EcvZod.safeParse(request.body);

  if (!parsedEcv.success) {
    return response.status(400).json(parsedEcv.error);
  }

  request.body = parsedEcv.data;

  next();
};