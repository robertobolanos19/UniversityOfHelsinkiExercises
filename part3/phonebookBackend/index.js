const { response, json } = require('express')
const express = require('express')
const { request } = require('http')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(morgan('tiny'))

app.use(cors())

app.use(express.static('build'))

//understand how this works
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
//end

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send(people)
})

app.get('/info', (request, response) => {

  const d = new Date()

  response.send(`<h1>Phone book has info for ${people.length} people</h1> <h1>${d}</h1>`)
})

app.get('/api/persons', (request, response) => {
  response.json(people)
})

app.get('/api/persons/:id', (request,response)=>{
  const id = Number(request.params.id)
  
  const person = people.find(p => p.id === id)

  if(person)
  {
    response.json(person)
  }
  else
  {
    response.status(404).end()
  }

})

/*generate id will be used for the post*/
const generateId = ()=>{
  const maxId = people.length > 0
  ?
  Math.max(...people.map(p => p.id))
  :
  0

  return maxId + 1

}

//to add a person
app.post('/api/persons', (request,response)=> {
  const body = request.body

  console.log(body)

  if(!body.name||!body.number)
  {
    return response.status(400).json({
      error:'Content Missing'
    })
  }
  if(people.find(p => p.name === body.name))
  {
    return response.status(400).json({
      error:'name must be unique'
    })
  }

  //
  if(people.find(p => p.number === body.number))
  {
    return response.status(400).json({
      error:'number must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id:generateId(),
  }

  people = people.concat(person)
  
  response.json(person)

})

//to delete
app.delete('/api/persons/:id', (request, response)=> {
  const id = Number(request.params.id) 
  people = people.filter(p => p.id !== id) 

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

