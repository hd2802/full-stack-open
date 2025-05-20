import Person from './Person'

const Persons = ({ personlist }) => {
  return (
    <ul>
        {personlist.map((person) => (
          <Person key={person.name} name={person.name} number={person.number}/>
        ))}
    </ul>
  )
}

export default Persons