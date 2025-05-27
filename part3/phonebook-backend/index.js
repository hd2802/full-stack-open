const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)