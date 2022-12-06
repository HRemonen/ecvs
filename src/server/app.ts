import express from 'express';
const cors = require('cors');
require('express-async-errors')
const { requestLogger } = require('./utils/middleware')
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

//app.use('/api/login', loginRouter)
//app.use('/api/blogs', userExtractor, blogsRouter)
//app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

module.exports = app