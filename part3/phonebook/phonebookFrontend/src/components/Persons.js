import Person from "./Person"
const Persons = ({persons, newFilterVal,del})=>{
    return(
    <div>
        {persons.filter(p=> p.name.toLowerCase().includes(newFilterVal.toLowerCase()))
        .map(p => <Person key={p.name} p={p} del={del}/>)}
    </div>
    )
}

export default Persons

