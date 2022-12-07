import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users';
import mongoose from "mongoose";
import config from './utils/config';

require('express-async-errors');

const app = express();
app.use(cors());
app.use(express.json());

void mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

// Routers goes in here
//app.use('/api/login', loginRouter)
//app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter);
//...etc

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
};

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

export default app;