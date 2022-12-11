import express from 'express';
import { Ecv } from '../types';
import ecvsService from '../services/ecvsService';
import EcvZod from '../utils/ecvsValidator';
import { userExtractor, CustomRequest } from '../middlewares/userMiddleware';

const ecvsRouter = express.Router();

ecvsRouter.get('/', async (_request, response) => {
  const ecvs: Array<Ecv> = await ecvsService.getEcvs();
  return response.json(ecvs);
});

ecvsRouter.get('/:id', async (request, response) => {
  const ecv = await ecvsService.getEcv(request.params.id);

  if (!ecv) {
    return response.status(401).json({ error: 'malformatted id'});
  }
  return response.json(ecv);
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

ecvsRouter.put('/:id', userExtractor, async (request, response) => {
  const ecvToUpdate = await ecvsService.getEcv(request.params.id);
  const user = (request as CustomRequest).user;

  if (!ecvToUpdate) {
    return response.status(401).json({ error: 'malformatted id'});
  }
  if (!user || ecvToUpdate.user.toString() !== user) {
    return response.status(401).json({ error: 'unauthorized action' });
  }
  
  const parsedEcv = EcvZod.safeParse({ ...request.body, user});

  if (!parsedEcv.success) {
    return response.status(400).json(parsedEcv.error);
  }

  const updatedEcv = await ecvsService.updateEcv(request.params.id, parsedEcv.data);
  return response.status(201).json(updatedEcv);
});

ecvsRouter.delete('/:id', userExtractor, async (request, response) => {
  const ecvToDelete = await ecvsService.getEcv(request.params.id);
  const user = (request as CustomRequest).user;

  if (!ecvToDelete) {
    return response.status(401).json({ error: 'malformatted id'});
  }
  if (!user || ecvToDelete.user.toString() !== user) {
    return response.status(401).json({ error: 'unauthorized action' });
  }
  
  await ecvsService.deleteEcv(request.params.id, user);

  return response.status(204).end();
});

export default ecvsRouter;