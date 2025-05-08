import { useState } from 'react'

const Details = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  )
}

const PersonList = ({ listofpeople }) => {
  return (
    <ul>
    {listofpeople.map(entry =>
      <Details key={entry.name} name={entry.name} number={entry.number} />
    )}
  </ul>
  )
}

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

  const handleSearch = (event) => {
    event.preventDefault()
    setFiltered(persons.filter((e) => e.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleInputChangeNumber = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with 
      <input onChange={handleSearch} />
      <h2>add new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleInputChange}/>
        </div>
        <div>
          number: <input onChange={handleInputChangeNumber} />
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
        <PersonList listofpeople={filtered} />
    </div>
  )
}

export default App 