const Filter = ({ filter, onFilterChange }) => (
    <input type="text" value={filter} onChange={(event) => onFilterChange(event.target.value)} placeholder="Type to filter countries"/>
);

export default Filter

// const Filter = ({ handleFilter, inputValue }) => {
//   return (
//   <div>
//   <input type="text" onChange={handleFilter} value={inputValue} />
//   </div>
//   );
//   };