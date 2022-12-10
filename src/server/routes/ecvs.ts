import express, { Request, Response } from 'express';
import EcvModel from '../models/ecv';
import EcvZod, { ValidatedEcv } from '../utils/ecvsValidator';
import ecvsService from '../services/ecvsService';
import { userExtractor, CustomRequest } from '../middlewares/middleware';


const ecvsRouter = express.Router();

const parseEcv = (user: string, request: Request, response: Response) => {
  const parsedEcv = EcvZod.safeParse({ ...request.body, user});

  if (!parsedEcv.success) {
    return response.status(400).json(parsedEcv.error);
  }

  return parsedEcv.data;
}

const getEcvById = async (ecvId: string, response: Response) => {
  const ecv = await EcvModel.findById(ecvId);
  if (!ecv) {
    return response.status(401).json({ error: 'malformatted id'});
  }
  return ecv;
};

const checkAuthorization = (user: string, ecv: any) => {
  if (!user || ecv.user.toString() !== user) {
    return false;
  }
  return true;
};

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
  const ecvToUpdate = await getEcvById(request.params.id, response);
  const user = (request as CustomRequest).user;

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!request.body) {
    return response.status(401).json({ error: "updated fields missing" });
  }

  //because we are parsing the ecv above we can be sure it went well 
  //otherwise it would return status 401.
  if (checkAuthorization(user, ecvToUpdate)) {
    const parsedEcv = parseEcv(user, request, response);
    const updatedEcv = await ecvsService.updateEcv(request.params.id, parsedEcv as ValidatedEcv);
    return response.status(201).json(updatedEcv);
  }
  return response.status(401).json({ error: 'unauthorized action' });
});

ecvsRouter.delete('/:id', userExtractor, async (request, response) => {
  const ecvToDelete = await getEcvById(request.params.id, response);
  const user = (request as CustomRequest).user;

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (checkAuthorization(user, ecvToDelete)) {
    await ecvsService.deleteEcv(request.params.id, user);
    return response.status(204).end();
  }
  return response.status(401).json({ error: 'unauthorized action' });
});

export default ecvsRouter;