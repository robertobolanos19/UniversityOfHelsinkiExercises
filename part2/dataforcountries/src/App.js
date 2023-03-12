import React, { useState, useEffect } from 'react';

import Input from './components/Input';
import CountriesList from './components/CountriesList';
import countriesServices from './services/countriesServices';

const App = () => {
  
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    countriesServices.getAll(setCountries)
  }, []);

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
