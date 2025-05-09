import { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(persons => {
        setFiltered(persons)
        setPersons(persons)
      })
  }, [])

  //console.log(persons)

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

        phonebookService
          .create(personObject)
          .then(returned => {
            setPersons(persons.concat(returned))
            setFiltered(filtered.concat(returned))
          })
      
        setPersons(persons.concat(personObject))
        setFiltered(filtered.concat(personObject))
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