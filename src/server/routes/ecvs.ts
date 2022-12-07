import express from 'express';

import ecvsService from '../services/ecvsService';
import ValidateEcv from '../utils/ecvsValidator';

const ecvsRouter = express.Router();

ecvsRouter.get('/', async (_request, response) => {
  const ecvs = await ecvsService.getEcvs();
  return response.json(ecvs);
});

ecvsRouter.post('/', async (request, response) => {
  const user = request.body.user;

  if (!user) {
    return response.status(400).json({error: "user missing or invalid"});
  }

  const parsedEcv = ValidateEcv.safeParse(request.body);

  if (!parsedEcv.success) {
    return response.status(400).json(parsedEcv.error);
  }

  const newEcv = parsedEcv.data;
  console.log(newEcv);
  
  const savedEcv = await ecvsService.createEcv(newEcv);

  return response.status(201).json(savedEcv);

});

export default ecvsRouter;