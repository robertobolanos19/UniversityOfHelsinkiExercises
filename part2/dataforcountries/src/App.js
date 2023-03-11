// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Filter from "./components/Filter";
// import CountriesList from "./components/CountriesList";

// const App = () => {
//   const [filter, setFilter] = useState("");
//   const [countries, setCountries] = useState([]);
//   const [filteredCountries, setFilteredCountries] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://restcountries.com/v2/all")
//       .then((response) => setCountries(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   useEffect(() => {
//     setFilteredCountries(
//       countries
//         .filter((country) =>
//           country.name.toLowerCase().includes(filter.toLowerCase())
//         )
//         .sort((a, b) => (a.name > b.name ? 1 : -1))
//     );
//   }, [filter, countries]);

//   const handleChange = (event) => {
//     setFilter(event.target.value);
//   };

//   const handleClick = (countryName) => {
//     setFilter(countryName);
//   };

//   return (
//     <div>
//       <Filter handleChange={handleChange} />
//       {filteredCountries.length > 10 ? (
//         <p>Please be more specific</p>
//       ) : (
//         <CountriesList countries={filteredCountries} handleClick={handleClick} />
//       )}
//     </div>
//   );
// };

// export default App;







import React, { useState, useEffect } from 'react';

import Input from './components/Input';
import CountriesList from './components/CountriesList';
// import axios from 'axios';

// import Filter from './components/Filter';
// import CountriesList from './components/CountriesList';
import countriesServices from './services/countriesServices';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    countriesServices.getAll(setCountries)
  }, []);

  //console.log(countries)

  const handleFilter = (e) => {
    setFilter(e.target.value)
    //console.log(e.target.value)
  }

  return (
    <div>
      <Input handleFilter={handleFilter} filterValue={filter}/>
      <CountriesList countries={countries} filter={filter} setFilter={setFilter}/>
    </div>
  );
};

export default App;






















// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Filter = ({ handleChange }) => {
//   return (
//     <input
//       type="text"
//       placeholder="Search for countries"
//       onChange={handleChange}
//     />
//   );
// };

// const Countries = ({ countries, handleClick }) => {
//   return (
//     <ul>
//       {countries.map((country) => (
//         <li key={country.name} onClick={() => handleClick(country.name)}>
//           {country.name}
//         </li>
//       ))}
//     </ul>
//   );
// };

// const App = () => {
//   const [filter, setFilter] = useState("");
//   const [countries, setCountries] = useState([]);
//   const [filteredCountries, setFilteredCountries] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://restcountries.com/v2/all")
//       .then((response) => setCountries(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   useEffect(() => {
//     setFilteredCountries(
//       countries
//         .filter((country) =>
//           country.name.toLowerCase().includes(filter.toLowerCase())
//         )
//         .sort((a, b) => (a.name > b.name ? 1 : -1))
//     );
//   }, [filter, countries]);

//   const handleChange = (event) => {
//     setFilter(event.target.value);
//   };

//   const handleClick = (countryName) => {
//     setFilter(countryName);
//   };

//   return (
//     <div>
//       <Filter handleChange={handleChange} />
//       {filteredCountries.length > 10 ? (
//         <p>Please be more specific</p>
//       ) : (
//         <Countries countries={filteredCountries} handleClick={handleClick} />
//       )}
//     </div>
//   );
// };

// export default App;











/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import countriesServices from "./services/countries";
import Filter from "./components/Filter";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // useEffect((setCountries)=>{
  //   countriesServices.getAll()
  // }, [])

  useEffect((setCountries) => {
    countriesServices.getAll()
    // axios.get("https://restcountries.com/v2/all")
    //   .then(res => setCountries(res.data))
    //   .catch(err => console.error(err));
  }, []);

  const handleFilter = (event) => {
    setFilteredCountries(countries.filter(country => 
      country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    );
  }

  return (
    <div>
      <Filter onFilter={handleFilter} />
      <ul>
        {filteredCountries.sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(country => (
          <li key={country.alpha3Code}>
            <h3>{country.name}</h3>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



export default CountryList;

*/





  

// // Component for the filter function
// const Filter = ({ handleFilter, inputValue }) => {
//   return (
//   <div>
//   <input type="text" onChange={handleFilter} value={inputValue} />
//   </div>
//   );
//   };
  
//   // Component for the axios function
//   const Countries = ({ countries }) => {
//   return (
//   <ul>
//   {countries.map((country) => (
//   <li key={country.alpha3Code}>{country.name}</li>
//   ))}
//   </ul>
//   );
//   };
  
//   // Main component that combines the filter and axios function
//   const App = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [countries, setCountries] = useState([]);
  
//   useEffect(() => {
//   axios
//   .get("https://restcountries.com/v2/all")
//   .then((response) => {
//   setCountries(response.data);
//   })
//   .catch((error) => {
//   console.error(error);
//   });
//   }, []);
  
//   const handleFilter = (event) => {
//   setInputValue(event.target.value);
//   };
  
//   const filteredCountries = countries.filter((country) =>
//   country.name.toLowerCase().includes(inputValue.toLowerCase())
//   );
  
//   return (
//   <div>
//   <Filter handleFilter={handleFilter} inputValue={inputValue} />
//   {filteredCountries.length > 10 ? (
//   <p>Please make your query more specific</p>
//   ) : (
//   <Countries countries={filteredCountries} />
//   )}
//   </div>
//   );
//   };
  
//   export default App;
  
  
  
  




























// import { useState, useEffect } from 'react'
// import axios from 'axios';
// //needed to call functions of axios
// import countriesServices from './services/countries'
// //needed to let the filter system work
// import Filter from './components/Filter';
// //needed to create a list of objects after filtered
// import List from './components/List';

// const App = () => {
//   const [countries,setCountries] = useState([])
//   const [newFilter,setNewFilter] = useState('')


//   useEffect(()=>{
//     countriesServices.getAll()
//     .then(initialCountries=>{
//       setCountries(initialCountries)
//     })
//   })

//   // useEffect(() => {
//   //   console.log('effect: fetch restcountries api')
//   //   axios
//   //     .get('https://restcountries.com/v3.1/all/')
//   //     .then(response => {
//   //       console.log('promise fulfilled: got restcountries api')
//   //       let sorted = response.data.slice().sort((a, b) => {
//   //         if (a.name.common < b.name.common) return -1;
//   //         if (a.name.common > b.name.common) return 1;
//   //         return 0;
//   //       })
//   //       setCountries(sorted)
//   //     })
//   // }, [])


//   const handleFilter = (e) => setNewFilter(e.target.value)

//   return(
//     <>
//       <Filter handleFilter={handleFilter} value={newFilter}/>
//       <List countries={countries}/>
//     </>
//   )
// }

// export default App

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const App = () => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     axios
//       .get('https://restcountries.com/v2/all')
//       .then(res => {
//         const sortedCountries = res.data.sort((a, b) =>
//           a.name.localeCompare(b.name)
//         );
//         setCountries(sortedCountries);
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <h1>List of Countries</h1>
//       <ul>
//         {countries.map(country => (
//           <li key={country.alpha2Code}>
//             <h2>{country.name}</h2>
//             <img src={country.flag} alt={`Flag of ${country.name}`} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
