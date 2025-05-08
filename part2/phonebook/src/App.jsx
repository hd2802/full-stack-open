import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([
    // dummy data for search feature testing
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
  const [filtered, setFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    //console.log(persons)
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
  
    else {
      if (newNumber !== '' && newName !== '') {
        const personObject = {
          name: newName,
          number: newNumber,
          id: String(persons.length + 1),
        }
      
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleInputChangeNumber = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    setFiltered(persons.filter((e) => e.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter funcRef={handleSearch}/>

      <PersonForm inputRef={handleInputChange} numberRef={handleInputChangeNumber} submitRef={addNewPerson} />
      <PersonList listofpeople={filtered} />
    </div>
  )
}

export default App 