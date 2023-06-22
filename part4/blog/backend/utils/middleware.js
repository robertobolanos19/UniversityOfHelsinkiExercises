//!FINE
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenHandler = (request,response,next) => {

  const authorization = request.get('authorization')

  if(!authorization|| !authorization.startsWith('Bearer '))
  {
    return response.status(401).json({ error:'token is missing' })
  }

  let token = authorization.slice(7)

  request.token = token

  next()

}

const userFinderHandler = (request,response,next) => {
  const decodedToken = jwt.verify(request.token,process.env.SECRET)

  if(!decodedToken.id)
  {
    return response.status(401).json({ error:'token invalid' })
  }

  let user = decodedToken.id

  request.user = user

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenHandler,
  userFinderHandler
}