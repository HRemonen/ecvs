import express from 'express';
import { Posting } from '../types';
import applyService from '../services/applyService';
import postingService from '../services/postingService';
import { CustomRequest, userExtractor } from '../middlewares/userMiddleware';
import { postingExtractor } from '../middlewares/parserMiddleware';

const postingRouter = express.Router();

postingRouter.get('/', async (_request, response) => {
  const postings: Array<Posting> = await postingService.getPostings();
  return response.json(postings);
});

postingRouter.get('/:id', async (request, response) => {
  const posting: Posting = await postingService.getPosting(request.params.id);
  return response.json(posting);
});

postingRouter.post('/', postingExtractor, async (request, response) => {
  const savedPosting = await postingService.createPosting(request.body);

  return response.status(201).json(savedPosting);
});

postingRouter.post('/:id/apply', userExtractor,async (request, response) => {
  const user = (request as CustomRequest).user;
  const ecv: string = request.body.ecv;

  await applyService.applyJob(user as string, ecv, request.params.id);

  return response.status(204).end();
});

export default postingRouter;