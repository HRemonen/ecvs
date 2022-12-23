import express from 'express';
import { Posting } from '../types';
import postingService from '../services/postingService';
import { postingExtractor } from '../middlewares/parserMiddleware';

const postingRouter = express.Router();

postingRouter.get('/', async (_request, response) => {
  const postings: Array<Posting> = await postingService.getPostings();
  return response.json(postings);
});

postingRouter.get('/:id', async (request, response) => {
  const postings: Posting = await postingService.getPosting(request.params.id);
  return response.json(postings);
});

postingRouter.post('/', postingExtractor, async (request, response) => {
  const savedPosting = await postingService.createPosting(request.body);

  return response.status(201).json(savedPosting);
});

export default postingRouter;