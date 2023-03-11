/*
1) the two parameters main parameters are handleFilter and value
2) the input has 3 main props called type, onChange and value   
    type changes all values in input to text, onChange will be executed when the inputField is changed
    and value is from the inputField.
3) from the parameters onChange will be looking

*/

const Filter = ({handleFilter,value}) => {
    return(
      <div>
        Filter shown with: <input type='text' onChange={handleFilter} value={value}/>
      </div>
    )
}

//Filter is then exported with its functionality  
export default Filter