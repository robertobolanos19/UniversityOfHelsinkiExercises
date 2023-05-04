//The app.js file that creates the actual application takes the router into use as shown below:

const config = require('./utils/config') //to get access to our port and mongo_uri
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes') // to use as a middleware for our routing functions
const middleware = require('./utils/middleware') // to get access to our middleware like unknownendpoint etc
const logger = require('./utils/logger') // to log our input in terminal during testing
const mongoose = require('mongoose')
require('express-async-errors') //to eliminate the catch from the methods

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter) //basically instead of having our routers with app we use notesRouter in place with app

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app