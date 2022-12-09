import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from './utils/config';

import usersRouter from './routes/users';
import ecvsRouter from './routes/ecvs';
import loginRouter from './routes/login';

import { userExtractor } from './middlewares/middleware';

require('express-async-errors');

const app = express();
app.use(cors());
app.use(express.json());

void mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

// Routers goes in here
app.use('/api/ecvs', ecvsRouter, userExtractor);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
//...etc

/* if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
} */

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

export default app;