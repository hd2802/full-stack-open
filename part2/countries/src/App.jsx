import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const OneCountryView = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {/** cannot have a for statement in JSX
         *   also cannot use map or forEach directly as languages is an object - not an array
         *   Object.entries converts this into an array
         */}
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <h2>Flag</h2>
      <img src={country.flags.png}></img>
    </div>  
  )
}

const CountryView = ({ countrylist, alterSearch }) => {
  if(countrylist.length === 0) {
    return <p>no matches</p>
  }
  if (countrylist.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if(countrylist.length === 1) {
    return <OneCountryView country={countrylist[0]} />
  }
  if(countrylist.length < 10) {
    return (
      <ul>
        {
          countrylist.map(country => {
            return <li> {country.name.common} 
            <button onClick={() => alterSearch(country.name.common)}>
              Show
            </button></li>
          })
        }
      </ul>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const alterSearch = (searchTerm) => {
    setSearch(searchTerm)
  }

  const filteredCountries = countries.filter(country => {
    // note: needed the return statement here to actually edit the values contained in filteredCountries
    return country.name.common.toUpperCase().includes(search.toUpperCase())
  })

  return (
    <div>
      find countries <input
        value={search}
        onChange={handleSearch}></input>
      <br></br>
      <CountryView countrylist={filteredCountries}
      alterSearch={alterSearch}/>
    </div>
  )
}

export default App