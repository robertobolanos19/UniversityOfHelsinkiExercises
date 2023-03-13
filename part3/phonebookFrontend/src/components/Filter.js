const Filter = ({handleFilter,value}) => {
    return(
      <div>
        Filter shown with: <input type='text' onChange={handleFilter} value={value}/>
      </div>
    )
}

//Filter is then exported with its functionality  
export default Filter