const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const { response, request } = require('express')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))
app.use(morgan('tiny'))

const Contact = require('./models/contacts')

//understand how this works
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
//end

let contacts=[
]

app.get('/api/persons/info', (request, response) => {
  const d = new Date()
  response.send(`<h1>Phone book has info for ${contacts.length} people</h1> <h1>${d}</h1>`)
})

app.get('/api/persons',(request,response)=>{
  Contact.find({}).then(contacts=>{
      response.json(contacts)
  })
})

// app.get('/api/persons/:id', (request,response)=>{
//   const id = Number(request.params.id)
  
//   const person = persons.find(p => p.id === id)

//   if(person)
//   {
//     response.json(person)
//   }
//   else
//   {
//     response.status(404).end()
//   }

// })

// /*generate id will be used for the post*/
// const generateId = ()=>{
//   const maxId = persons.length > 0
//   ?
//   Math.max(...persons.map(p => p.id))
//   :
//   0

//   return maxId + 1

// }

//to add a person
app.post('/api/persons', (request,response)=> {
  const body = request.body

  console.log(body)

  // if(!body.name||!body.number)
  // {
  //   alert('All fields must be filled')
  //   return response.status(400).json({
  //     error:'Content Missing'
  //   })
  // }
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing!' })
  }

  // //
  // if(persons.find(p => p.number === body.number))
  // {
  //   return response.status(400).json({
  //     error:'number must be unique'
  //   })
  // }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then(savedContact=>{
    response.json(savedContact)
  })

})

// //to delete
app.delete('/api/persons/:id', (request, response)=> {
  const id = Number(request.params.id) 
  contacts = contacts.filter(c => c.id !== id) 

  response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})