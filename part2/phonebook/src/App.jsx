import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({ persons, searchTerm, handleDelete }) => {
  console.log(persons)
  return(
    <ul>
      {persons.map(person => {
        if(person.name.includes(searchTerm)){
          return <li key={person.name}>{person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>
              delete
            </button></li>
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
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  let id_increment = persons.length + 1

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
      number: newNumber,
      id: id_increment.toString()
    }

    id_increment+=1

     personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id) => {
    if(window.confirm("Do you want to delete this contact?")) {
      personService
        .remove(id)
        .then(response => {

        })

      setPersons(persons.filter(person => person.id !== id))
    }
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
      <Persons persons={persons}  searchTerm={searchTerm} handleDelete={handleDelete}/>
    </div>
  )
}

export default App