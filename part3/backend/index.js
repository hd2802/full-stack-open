const express = require('express')
const app = express()

app.use(express.json())

const RANDOM = 10000000

let persons = [
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

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/info', (request, response) => {
  const num = persons.length
  const timeStamp = new Date()
  response.send(`
    <div> 
      <p>Phonebook has info for ${num} people</p>
      <p>Request recieved at ${timeStamp} </p>
    </div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  person.id = Math.floor(Math.random() * RANDOM)
  
  if (!person.name) {
    response.status(400).json({
      error: 'name is missing'
    })
  }

  if(!person.number) {
    response.status(400).json({
      error: 'number is missing'
    })
  }

  if(persons.sum(p => p.name === person.name)) {
    response.status(400).json({
      error: 'name must be unique'
    })
  }

  console.log(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = requests.params.id
  person = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})