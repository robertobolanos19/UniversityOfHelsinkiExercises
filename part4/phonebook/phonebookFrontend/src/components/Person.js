const Person = ({p,del})=>{
    return(
      <>
        <h3>{p.name} {p.number} <button onClick={()=>del(p)}>Delete</button></h3>
        
      </>
    )
    
}

export default Person