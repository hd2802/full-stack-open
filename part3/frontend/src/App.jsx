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

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
  
  const existingPerson = persons.find(person => person.name === newName)
  
  if (!existingPerson) {
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
        setSuccessMessage(`${newName} was added successfully`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch((error) => {
        console.error('Error adding person:', error)
        setErrorMessage(`Validation error adding person: check all fields are valid`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  } else {

    if (window.confirm(`${newName} is already added to the phonebook, would you like to update the number?`)) {
      
      phonebookService
        .update(existingPerson.id, { name: newName, number: newNumber })
        .then((response) => {
          const updatedPerson = response.data

          setPersons(persons => 
            persons.map(person => 
              person.id !== updatedPerson.id ? person : updatedPerson
            )
          )
          
          setFilteredPersons(filteredPersons => 
            filteredPersons.map(person => 
              person.id !== updatedPerson.id ? person : updatedPerson
            )
          )
      
          setSuccessMessage(`${newName} was updated successfully`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch((error) => {
          // code handles errors separately but inside the same catch block - problem arose when having 2 catch
          // blocks as both were called
          console.error('Error updating person:', error)
          if (error.response && error.response.status === 404) {
            setErrorMessage(`${newName} was already removed from server`)
            setPersons(persons => persons.filter(p => p.id !== existingPerson.id))
            setFilteredPersons(filteredPersons => filteredPersons.filter(p => p.id !== existingPerson.id))
          } else {
            setErrorMessage(`Error updating ${newName}: ${error.response?.data?.error || 'check all fields are valid'}`)
          }
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
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
      <h1>Phonebook</h1>
      <Notification message={successMessage} error={false}/>
      <Notification message={errorMessage} error={true} />
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