import { useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    let found = false

    persons.forEach(person => {
      if(person.name === newName) {
        found = true
      }
    })

    if(!found) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setFilteredPersons(filteredPersons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    const term = event.target.value

    setFilteredPersons(persons.filter((person) => {
      return person.name.includes(term) //needed the return statement here to actually produce something
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName}
       handleNameChange={handleNameChange} newNumber={newNumber} 
       handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personlist={filteredPersons} />
    </div>
  )
}

export default App