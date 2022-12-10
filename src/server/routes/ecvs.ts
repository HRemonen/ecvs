import express from 'express';
import EcvModel from '../models/ecv';
import EcvZod from '../utils/ecvsValidator';
import ecvsService from '../services/ecvsService';
import { userExtractor, CustomRequest } from '../middlewares/middleware';


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

ecvsRouter.put('/:id', userExtractor, async (request, response) => {
  const ecvToUpdate = await EcvModel.findById(request.params.id);
  const user = (request as CustomRequest).user;

  if (!ecvToUpdate) {
    return response.status(401).json({ error: 'malformatted id'});
  }
  if (!request.body || request.body.length === 0) {
    return response.status(401).json({ error: "updated fields missing" });
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
  const ecvToDelete = await EcvModel.findById(request.params.id);
  const user = (request as CustomRequest).user;

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