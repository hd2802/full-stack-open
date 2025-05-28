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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// these are the middleware assignments 
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :body'))
app.use(unknownEndpoint)
app.use(errorHandler)

// for testing and debugging application without the MongoDB connection
//const persons = require('./initial_data').persons


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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
}) 

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  // need to update the error handling here for MongoDB 

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

