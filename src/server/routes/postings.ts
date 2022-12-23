import express from 'express';
import { Posting } from '../types';
import postingService from '../services/postingService';
import { CustomRequest, userExtractor } from '../middlewares/userMiddleware';
import { postingExtractor } from '../middlewares/parserMiddleware';

const postingRouter = express.Router();

postingRouter.get('/', async (_request, response) => {
  const postings: Array<Posting> = await postingService.getPostings();
  return response.json(postings);
});

postingRouter.post('/', userExtractor, postingExtractor, async (request, response) => {
  const manager = (request as CustomRequest).user;

  const savedPosting = await postingService.createPosting(manager as string, request.body);

  return response.status(201).json(savedPosting);
})