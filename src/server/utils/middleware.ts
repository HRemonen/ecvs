const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request: any, _response: any, next: () => void) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

module.exports = {
  requestLogger
}