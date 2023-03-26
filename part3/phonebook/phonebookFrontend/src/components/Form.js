const Form = ({handleSubmit,nameVal,handleNameInput,handleNumInput,newPhoneNumberVal})=>{
    return(
        <form onSubmit={handleSubmit}>
            <div>
                Name: <input autoFocus value={nameVal} onChange={handleNameInput}/>
            </div>
            <div>
                Phone Number: <input value={newPhoneNumberVal} onChange={handleNumInput}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form