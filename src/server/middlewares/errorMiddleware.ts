import {Request, Response, NextFunction} from 'express';

export const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {
  console.log(error);

  if (error.name === 'CastError') {
    return response.status(401).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    });
  }

  next(error);
};