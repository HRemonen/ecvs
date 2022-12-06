import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users';

require('express-async-errors');

const app = express();
app.use(cors());
app.use(express.json());

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