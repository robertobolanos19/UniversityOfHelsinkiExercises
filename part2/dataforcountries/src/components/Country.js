const Country = ({ countries,filter})=>{
    const country = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))[0]

    return (
        <div>
          <h2>{country.name.common}</h2>
          {country.capital && <p>capital: {country.capital[0]}</p>}
          <p>area: {country.area}</p>
          <img src={country.flags.png} width="200" alt={`flag of ${country.name.common}`}/>
          {country.capital}
        </div>
      )
}

export default Country