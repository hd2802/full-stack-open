require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const person = require('./models/person')
const app = express()

const Person = require('./models/person')

app.use(cors())

// tells morgan how to handle requests that have the 'body' property 
morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :body'))

// for testing and debugging application without the MongoDB connection
//const persons = require('./initial_data').persons

// MongoDB/Mongoose database connections



// request contains all the information of the HTTP request
// response defines how he request is responded to - in this case, we respond by sending
// the header - express automatically sets the value of the response (in this case it is text/html)
app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

// defines event handler that handles HTTP GET requests made to this path of the application
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people <br />
        ${Date()}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  response.json(person)
}) 

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  // need to update the error handling here for MongoDB 

  const newPerson = {
    id: String(persons.length + 1),
    name : body.name,
    number : body.number,
  }

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

