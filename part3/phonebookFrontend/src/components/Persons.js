import Person from "./Person"
const Persons = ({persons, newFilter,del})=>{
    return(
    <div>
        {persons.filter(p=> p.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map(p => <Person key={p.name} p={p} del={del}/>)}
    </div>
    )
}

export default Persons

