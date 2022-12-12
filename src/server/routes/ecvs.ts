import express from 'express';
import { Ecv } from '../types';
import ecvsService from '../services/ecvsService';
import { userExtractor, CustomRequest } from '../middlewares/userMiddleware';
import { ecvExtractor } from '../middlewares/parserMiddleware';

const ecvsRouter = express.Router();

ecvsRouter.get('/', async (_request, response) => {
  const ecvs: Array<Ecv> = await ecvsService.getEcvs();

  return response.json(ecvs);
});

ecvsRouter.get('/:id', async (request, response) => {
  const ecv = await ecvsService.getEcv(request.params.id);

  return response.json(ecv);
});

ecvsRouter.post('/', userExtractor, ecvExtractor, async (request, response) => {
  const user = (request as CustomRequest).user;

  const savedEcv = await ecvsService.createEcv(user as string, request.body);

  return response.status(201).json(savedEcv);
});

ecvsRouter.put('/:id', userExtractor, ecvExtractor, async (request, response) => {
  const ecvToUpdate = await ecvsService.getEcv(request.params.id);
  const user = (request as CustomRequest).user;

  if (!user || ecvToUpdate.user.toString() !== user) {
    return response.status(401).json({ error: 'unauthorized action' });
  }

  const updatedEcv = await ecvsService.updateEcv(request.params.id, request.body);

  return response.status(201).json(updatedEcv);
});

ecvsRouter.delete('/:id', userExtractor, async (request, response) => {
  const ecvToDelete = await ecvsService.getEcv(request.params.id);
  const user = (request as CustomRequest).user;

  if (!user || ecvToDelete.user.toString() !== user) {
    return response.status(401).json({ error: 'unauthorized action' });
  }
  
  await ecvsService.deleteEcv(user, request.params.id);

  return response.status(204).end();
});

export default ecvsRouter;