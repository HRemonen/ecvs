import express from 'express';
import EcvZod from '../utils/ecvsValidator';
import ecvsService from '../services/ecvsService';
import UserModel from "../models/user";
import { userExtractor, CustomRequest } from '../middlewares/middleware';

const ecvsRouter = express.Router();

ecvsRouter.get('/', async (_request, response) => {
  const ecvs = await ecvsService.getEcvs();
  return response.json(ecvs);
});

ecvsRouter.post('/', userExtractor, async (request, response) => {
  const user = (request as CustomRequest).user

  if (!(request as CustomRequest).user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const loggedUser = await UserModel.findById(user);

  if (!loggedUser) {
    return response.status(400).json({error: "user not found"});
  }

  const parsedEcv = EcvZod.safeParse({ ...request.body, user: loggedUser.id });

  if (!parsedEcv.success) {
    return response.status(400).json(parsedEcv.error);
  }

  const savedEcv = await ecvsService.createEcv(parsedEcv.data);

  loggedUser.ecvs.push(savedEcv._id);

  await loggedUser.save();

  return response.status(201).json(savedEcv);
});

export default ecvsRouter;