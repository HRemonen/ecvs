import "express-async-errors";
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from './utils/config';
import path from 'path';

import usersRouter from './routes/users';
import ecvsRouter from './routes/ecvs';
import loginRouter from './routes/login';

import { errorHandler  } from "./middlewares/errorMiddleware";
import postingRouter from "./routes/postings";

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
app.use(express.static('dist'));

app.use('/api/ecvs', ecvsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/postings', postingRouter)

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const testingRouter = require('./routes/testing');
  app.use('/api/testing', testingRouter);
}

app.use(errorHandler);

app.get('/*',  (_request, response) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

export default app;