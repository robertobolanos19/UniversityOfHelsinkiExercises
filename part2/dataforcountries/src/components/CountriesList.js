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

// const CountriesList = ({ countries, handleClick }) => {
//     return (
//       <ul>
//         {countries.map((country) => (
//           <li key={country.name} onClick={() => handleClick(country.name)}>
//             {country.name}
//           </li>
//         ))}
//       </ul>
//     );
// };

export default CountriesList

/*
function CountriesList({ countries, filter }) {
  if (countries.length === 0) {
    return <div>No countries found</div>;
  }

  if (countries.length > 10) {
    return <div>Too many countries found, please make your query more specific</div>;
  }

  return (
    <ul>
      {countries
        .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
        .map(country => (
          <li key={country.alpha3Code}>{country.name}</li>
        ))}
    </ul>
  );
}
*/




  //   const Countries = ({ countries }) => {
//   return (
//   <ul>
//   {countries.map((country) => (
//   <li key={country.alpha3Code}>{country.name}</li>
//   ))}
//   </ul>
//   );
//   };