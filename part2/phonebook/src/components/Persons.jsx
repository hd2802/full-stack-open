

const Persons = ({ personlist, handleRemove }) => {
  return (
    <ul>
        {personlist.map((person) => (
          <li key={person.name}> {person.name} {person.number} 
          <button onClick={() => handleRemove(person.name, person.id)}>
            delete
          </button>
        </li>

        ))} 
    </ul>
  )
}

export default Persons