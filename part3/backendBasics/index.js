/*

In the first row, the application imports Node's built-in web server module. 
const http = require('http')


The code uses the createServer method of the http module to create a new web server. 
An event handler is registered to the server that is called every time an HTTP request 
is made to the server's address http://localhost:3001.

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

The last rows bind the http server assigned to the app variable, to listen to HTTP requests sent to port 3001:

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

*/

const { response } = require('express')
const express = require('express')
const { request } = require('http')


const app = express()
app.use(express.json())
app.use(express.static('build'))

const cors = require('cors')

app.use(cors())

//end 

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello Wor!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
  })

//generate id will be used in app.post below it
const generateId = () => {
    const maxId = notes.length > 0
      ? 
      /*What exactly is happening in that line of code? notes.map(n => n.id) creates a new array that contains all 
      the ids of the notes. Math.max returns the maximum value of the numbers that are passed to it. However, 
      notes.map(n => n.id) is an array so it can't directly be given as a parameter to Math.max. 
      The array can be transformed into individual numbers by using the "three dot" spread syntax ...*/
      Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body
  
    /*If the received data is missing a value for the content property, 
    the server will respond to the request with the status code 400 bad request*/
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }


    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
})


app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})