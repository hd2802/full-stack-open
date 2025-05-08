import { useState } from 'react'

const Person = ({ name }) => {
  return (
    <div>
      {name}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    console.log(persons)
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
  
    else {
      const personObject = {
        name: newName,
        id: String(persons.length + 1),
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person =>
          <Person key={person.name} name={person.name}/>
      )}
    </div>
  )
}

export default App