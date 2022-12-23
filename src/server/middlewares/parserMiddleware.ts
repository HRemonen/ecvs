import { Request, Response, NextFunction } from 'express';
import EcvZod from '../utils/ecvsValidator';
import { PostingZod } from '../utils/postingsValidator';

export const ecvExtractor = async (request: Request, response: Response, next: NextFunction) => {
  const parsedEcv = EcvZod.safeParse(request.body);

  if (!parsedEcv.success) {
    return response.status(400).json(parsedEcv.error);
  }

  request.body = parsedEcv.data;

  next();
};

export const postingExtractor = async (request: Request, response: Response, next: NextFunction) => {
  const parsedPosting = PostingZod.safeParse(request.body);

  if (!parsedPosting.success) {
    return response.status(400).json(parsedPosting.error);
  }

  request.body = parsedPosting.data;

  next();
};