const Details = ({ name, number }) => {
    return (
      <div>
        {name} {number}
      </div>
    )
  }
  
const PersonList = ({ listofpeople }) => {
    return (
        <div>
            <h2>Phone Book</h2>
            <ul>
            {listofpeople.map(entry =>
                <Details key={entry.name} name={entry.name} number={entry.number} />
            )}
            </ul>
        </div>
    )
}

export default PersonList