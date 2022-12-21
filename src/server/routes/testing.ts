import express from 'express';

import EcvModel from '../models/ecv';
import UserModel from '../models/user';

const testingRouter = express.Router();

testingRouter.post('/reset', async (_request, response) => {
  await EcvModel.deleteMany({});
  await UserModel.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;