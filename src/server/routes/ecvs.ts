import express from 'express';
import UserModel from "../models/user";
import ecvsService from '../services/ecvsService';
import EcvZod from '../utils/ecvsValidator';

const ecvsRouter = express.Router();

ecvsRouter.get('/', async (_request, response) => {
  const ecvs = await ecvsService.getEcvs();
  return response.json(ecvs);
});

ecvsRouter.post('/', async (request, response) => {
  const loggedUser = await UserModel.findById(request.body.user);

  if (!loggedUser) {
    return response.status(400).json({error: "user missing or invalid"});
  }

  const parsedEcv = EcvZod.safeParse(request.body);

  if (!parsedEcv.success) {
    return response.status(400).json(parsedEcv.error);
  }
  
  const savedEcv = await ecvsService.createEcv(parsedEcv.data);

  loggedUser.ecvs.push(savedEcv.id);

  await loggedUser.save();

  return response.status(201).json(savedEcv);

});

export default ecvsRouter;