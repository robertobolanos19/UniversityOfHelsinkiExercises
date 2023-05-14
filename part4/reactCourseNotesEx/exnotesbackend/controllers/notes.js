//* All of the routes related to notes are now in the notes.js module under the controllers directory.


//? So what are these router objects exactly? The Express manual provides the following explanation:
//? A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,”
//? capable only of performing middleware and routing functions. Every Express application has a built-in app router.
//? The router is in fact a middleware, that can be used for defining "related routes" in a single place, which is typically
//? placed in its own module.

const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if(authorization && authorization.startsWith('Bearer '))
  {
    return authorization.replace('Bearer ', '')
  }
  return null
}

//?Why dont we need to add '/api/notes'?
//*In app.js we declared noteRouter and get it the point '/api/notes' so we can use noteRouter which has '/api/notes' being used by app

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username:1, name:1 })
  response.json(notes)
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  logger.info(decodedToken)
  if(!decodedToken.id)
  {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id
  })

  const savedNote = await note.save()

  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
  const { content,important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter