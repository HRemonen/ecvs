import express from 'express';
import UserModel from "../models/user";
import ecvsService from '../services/ecvsService';
import ValidateEcv from '../utils/ecvsValidator';

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

  const parsedEcv = ValidateEcv.safeParse(request.body);

  if (!parsedEcv.success) {
    return response.status(400).json(parsedEcv.error);
  }
  
  const savedEcv = await ecvsService.createEcv(parsedEcv.data);

  loggedUser.ecvs = loggedUser.ecvs.concat(savedEcv._id);
  console.log(savedEcv._id)
  console.log(loggedUser.ecvs)
  await loggedUser.save()

  return response.status(201).json(savedEcv);

});

export default ecvsRouter;