import { useState, useEffect } from 'react'
import axios from 'axios'

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
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    persons.forEach(obj => {
      if (obj.name === newName) {
        alert(`${newName} is already in the phonebook`)
        return
      }
      }
    )

    const newPerson = {
      name: newName,
      number: newNumber
    }

     axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
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