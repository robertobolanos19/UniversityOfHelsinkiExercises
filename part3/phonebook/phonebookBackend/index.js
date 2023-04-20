const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name === 'ValidationError')
  {
    return response.status(400).json({ error:error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(morgan('tiny'))

const Contact = require('./models/contacts')

//understand how this works
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))
//end

app.get('/api/persons/info', (request, response) => {

  const d = new Date()

  Contact.find({}).then(contacts =>
  {
    response.send(`<h1>Phone book has info for ${contacts.length} people!</h1> <h1>${d}</h1>`)
  })
})

app.get('/api/persons',(request,response) => {
  Contact.find({}).then(contacts =>
  {
    response.json(contacts)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

//to add a person
app.post('/api/persons', (request,response,next) => {
  const body = request.body

  console.log(body)

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing!' })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
      console.log('deleted!')
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request,response,next) => {
  const body = request.body

  const person = {
    name:body.name,
    number:body.number,
  }

  Contact.findByIdAndUpdate(request.params.id, person)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => {
      next(error)
    })
})

app.use(unknownEndpoint)
//! this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
//