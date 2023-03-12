import axios from 'axios';

const baseUrl = "https://restcountries.com/v3.1/all"

const getAll = (setCountries)=>{
    
    const request = axios.get(baseUrl)
    return request.then(response => {
      console.log('promise fulfilled: got restcountries api')
      let sorted = response.data.slice().sort((a, b) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
      })
      setCountries(sorted)
    })
}

export default {getAll}
