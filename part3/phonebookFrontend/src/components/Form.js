const Form = ({handleSubmit,newName,handleNameInput,handleNumInput,newPhoneNumber, inputRef})=>{
    return(
        <form onSubmit={handleSubmit}>
            <div>
                Name: <input autoFocus value={newName} onChange={handleNameInput} ref={inputRef}/>
            </div>
            <div>
                Phone Number: <input value={newPhoneNumber} onChange={handleNumInput}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form