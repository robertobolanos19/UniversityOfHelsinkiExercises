//importing axios to execute methods needed to get data from server and utilize other functions
import axios from 'axios';
//url of the server where the data is coming from 
const baseUrl = "https://restcountries.com/v3.1/all"


//getAll is used to get the data from the server
const getAll = (setCountries)=>{
    //const request is initalizing where the data will be coming from
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


/*
  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then((response) => setCountries(response.data))
      .catch((error) => console.error(error));
  }, []);
*/



//returning functions
export default {getAll}

/*
  useEffect(() => {
    axios.get("https://restcountries.com/v2/all")
      .then(res => setCountries(res.data))
      .catch(err => console.error(err));
  }, []);
*/