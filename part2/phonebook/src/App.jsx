import { useState, useEffect } from 'react'
import phonebookService from './services/phonebookService'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [filteredPersons, setFilteredPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

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

      phonebookService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setFilteredPersons(filteredPersons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('error with post operation')
        })
      
        setSuccessMessage(`${newName} was added successfully`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
    }
    else {
      if(window.confirm(`${newName} is already added to the phonebook,
         would you like to update the number?`)) {
          let og = {}

          persons.forEach(person => {
            if(person.name === newName) {
              og = person
            }
          })

          if (JSON.stringify(og) !== '{}') {
            phonebookService.update(og.id, {name: newName, number: newNumber})
            .then((updatedPerson) => {
              setPersons(person => {
                person.id !== updatedPerson.id ? person : updatedPerson
              })
            .then((updatedPerson) => {
              setFilteredPersons(person => {
                person.id !== updatedPerson.id ? person : updatedPerson
              })
            })
            })
          }
      }
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

  const handleRemove = (name, id) => {
    if(window.confirm(`are you sure you want to delete ${name}?`)) {
      phonebookService
        .remove(id).then(() => {
          // update the UI to reflect the deleted person
          setPersons(persons.filter((person) => { return person.name !== name}))
          setFilteredPersons(filteredPersons.filter((person) => { return person.name !== name}))
        })
    }
  }

  return (
    <div>
      {/*<Notification message={errorMessage} />*/}
      <h1>Phonebook</h1>
      <Notification message={successMessage} />
      <Filter handleSearch={handleSearch} />

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName}
       handleNameChange={handleNameChange} newNumber={newNumber} 
       handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personlist={filteredPersons} handleRemove={handleRemove} />
    </div>
  )
}

export default App