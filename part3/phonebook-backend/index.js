const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// request contains all the information of the HTTP request
// response defines how he request is responded to - in this case, we respond by sending
// the header - express automatically sets the value of the response (in this case it is text/html)
app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

// defines event handler that handles HTTP GET requests made to this path of the application
app.get('/api/persons', (request, response) => {
    // transformation to JSON is automatically produces by express
    response.json(persons)
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

  if (body.name === null) {
    return response.status(400).json({
      error: 'name must be provided'
    })
  }

  if (body.number === null) {
    return response.status(400).json({
      error: 'number must be provided'
    })
  }

  let found = false
  persons.forEach(person => {
    person.name === body.name ? found = true : found = false
  })

  if (found) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: String(persons.length + 1),
    name : body.name,
    number : body.number,
  }

  persons.concat(newPerson)

  response.json(newPerson)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

