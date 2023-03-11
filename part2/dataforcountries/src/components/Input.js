const Input = ({handleFilter,filterValue})=>{
    return(
        <div>
            find countries <input type='text' onChange={handleFilter} value={filterValue}/>
        </div>
    )
}

export default Input