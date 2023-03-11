import axios from "axios";

//where all the local data is
const baseUrl = "http://localhost:3001/persons"

//getAll is used to get the data from the server
const getAll = ()=>{
    //const request is initalizing where the data will be coming from
    const request = axios.get(baseUrl)
    //the return is using request.then and skimming through the parameters data and returning that data
    return request.then(response => response.data)
}

//create has a parameter that is looking for newObject
const create = (newObject) => {
    //same as axios.post('http://localhost:3001/persons',nameObject)
    /*request has two parameters in the axios.post, first where the server is and what new object will be 
    created. newObject is the object that will be saved into the server
    */
    const request = axios.post(baseUrl,newObject)
    //the return is being used to skim through each response and gathering the data
    return request.then(response => response.data)
}

//update has two parameters: id, newObject, this function is being used to update data from the server
const update = (id,newObject)=>{
    /*request is being initalized from the the base url and a specific id, along with the object that will
    be updated
    */
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    //the return is being used to skim through each response and gathering the data
    return request.then(response => response.data)
}

//delete has one parameter: id, this function will delete the users url id and will cause the person to be delete from server
const deletePerson = (id) =>{
    //the request will delete the url containing the specific id
    const request = axios.delete(`${baseUrl}/${id}`)
    //the return is being used to skim through each response and gathering the data
    return request.then(response => response.data)
}


export default {getAll,create,update, deletePerson}