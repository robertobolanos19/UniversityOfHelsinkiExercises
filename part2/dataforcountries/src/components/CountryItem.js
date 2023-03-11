const CountryItem = ({country,setFilter}) => {
    return(
        <li key={country.name.official}>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>show</button>
        </li>
    )
}

export default CountryItem