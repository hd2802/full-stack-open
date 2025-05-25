require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')

const Person = require('./models/person')

const cors = require('cors')

const whitelist = ["http://localhost:5173"]; 

const corsOptions = { 
    origin: (origin, callback) => { 
        if (!origin || whitelist.includes(origin)) { 
            callback(null, true); 
        } else { 
            callback(new Error("Not allowed by CORS")); 
        } 
    }, 
    credentials: true, 
}; 
app.use(cors(corsOptions));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan('tiny'))

const RANDOM = 10000000


app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

/*
app.get('/info', (request, response) => {
  const num = persons.length
  const timeStamp = new Date()
  response.send(`
    <div> 
      <p>Phonebook has info for ${num} people</p>
      <p>Request recieved at ${timeStamp} </p>
    </div>`)
})
*/

app.get('/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(result => {
    response.json(result)
  })
})

app.post('/persons', (request, response) => {
  const body = request.body

  if(!body.number) {
     return response.status(400).json({ error: 'number missing' })
  }

  if(!body.name) {
     return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).json({ error: 'malformatted id' })
    })
})


const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})