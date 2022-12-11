import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from './utils/config';

import usersRouter from './routes/users';
import ecvsRouter from './routes/ecvs';
import loginRouter from './routes/login';

import { userExtractor } from './middlewares/userMiddleware';

const app = express();

void mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/ecvs', ecvsRouter, userExtractor);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

export default app;