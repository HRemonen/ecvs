import express from 'express';
import EcvZod from '../utils/ecvsValidator';
import ecvsService from '../services/ecvsService';
import { userExtractor, CustomRequest } from '../middlewares/middleware';
import EcvModel from '../models/ecv';

const ecvsRouter = express.Router();

ecvsRouter.get('/', async (_request, response) => {
  const ecvs = await ecvsService.getEcvs();
  return response.json(ecvs);
});

ecvsRouter.post('/', userExtractor, async (request, response) => {
  const user = (request as CustomRequest).user;

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const parsedEcv = EcvZod.safeParse({ ...request.body, user});

  if (!parsedEcv.success) {
    return response.status(400).json(parsedEcv.error);
  }

  const savedEcv = await ecvsService.createEcv(parsedEcv.data);

  return response.status(201).json(savedEcv);
});

ecvsRouter.delete('/:id', userExtractor, async (request, response) => {
  const ecvToDelete = await EcvModel.findById(request.params.id);
  const user = (request as CustomRequest).user

  if (!ecvToDelete) {
    return response.status(401).json({ error: 'malformatted id'});
  }

  if (!user || ecvToDelete.user.toString() !== user) {
    return response.status(401).json({ error: 'unauthorized action' });
  }

  await ecvsService.deleteEcv(ecvToDelete.id, user);

  return response.status(204).end();
});

export default ecvsRouter;