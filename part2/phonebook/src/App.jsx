import { useState } from 'react'

const Filter = ({ search, searchFunction }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={searchFunction} />
    </div>
  )
}

const NumberForm = ({ handleSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons, searchTerm }) => {
  console.log(persons)
  return(
    <ul>
      {persons.map(person => {
        if(person.name.includes(searchTerm)){
          return <li key={person.name}>{person.name} {person.number}</li>
        }
      })}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    persons.forEach(obj => {
      if (obj.name === newName) {
        alert(`${newName} is already in the phonebook`)
      }
      else {
        setPersons(persons.concat({name : newName,
          number: newNumber
        }))
        setNewName('')
        setNewNumber('')
      }
      }
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={searchTerm} searchFunction={handleSearch} />
      <h2>add a new</h2>
      <NumberForm 
        handleSubmit={handleSubmit} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons}  searchTerm={searchTerm}/>
    </div>
  )
}

export default App