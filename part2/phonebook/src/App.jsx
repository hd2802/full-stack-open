import { useState } from 'react'

const Details = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '1010100110010'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    console.log(persons)
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
  
    else {
      if (newNumber !== '' && newName !== '')
      {
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
    setNewName(event.target.value)
  }

  const handleInputChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

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
      {persons.map(person =>
          <Details key={person.name} name={person.name} number={person.number}/>
      )}
    </div>
  )
}

export default App 