import CountryItem from "./CountryItem"
import Country from "./Country"

const CountriesList = ({ countries,filter,setFilter }) => {
  const filtered = 
  countries
  .filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  .map(country => <CountryItem key={country.name.official} country={country} setFilter={setFilter}/>)

  return (filtered.length === 1 ? 
    <Country countries={countries} filter={filter} /> :
    filtered.length <= 10 ?  
    <ul>{filtered}</ul> : 
    <div>Too many matches, specify another filter</div> 
  )
}

export default CountriesList
