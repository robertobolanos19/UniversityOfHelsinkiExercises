//The index.js file only imports the actual application from the app.js file and then starts the application.

const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})










// const express = require('express')
// const app = express()
// const cors = require('cors')
// require('dotenv').config()

// const Note = require('./models/note')

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   }
//   else if(error.name === 'ValidationError'){
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(cors())
// app.use(express.static('build'))
// app.use(express.json())
// app.use(requestLogger)



// app.use(unknownEndpoint)

// //! this has to be the last loaded middleware.
// app.use(errorHandler)

// const PORT = process.env.PORT
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// //new chapter 4 version