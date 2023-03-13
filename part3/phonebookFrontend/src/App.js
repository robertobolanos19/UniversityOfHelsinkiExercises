import { useState, useRef, useEffect } from 'react'

import personServices from './services/persons'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {

  //*persons data
  const [persons, setPersons] = useState([])
  //*search filter
  const [newFilter, setNewFilter] = useState('')
  //*new person
  const [newName, setNewName] = useState('')
  //*phone numbers
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  //*notifications
  const [notification, setNotification] = useState(null)
  //*notification type: success,error
  const [notifType, setNotifType] = useState(null)

  useEffect(()=>{
  personServices.getAll()
  .then(initialPersons =>{
    setPersons(initialPersons)
  })
  })

  const inputRef = useRef()

  const handleSubmit = (e)=>{
    e.preventDefault()

    inputRef.current.select()
    
    //on submission a new person object is created 
    const nameObject = 
    {
      name:newName,
      number:newPhoneNumber
    }  

    if(persons.map((p)=>p.name).includes(newName))
    {
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`) &&
      personServices
      .update(persons.filter(p=>p.name === newName)[0].id, nameObject)
      .then(response =>{
        personServices.getAll()
        .then(response =>{
          setPersons(response)
          setNewName('')
          setNewPhoneNumber('')
          setNotifType(null)
          setNotification(`Changed ${nameObject.name}'s number`)
          setTimeout(()=>{
            setNotification(null)
          },5000)
        })
      })
      .catch(error =>{
        setNotifType('error')
        setNotification(`${newName} was already removed from server`)
        setTimeout(()=>{
          setNotifType(null)
          setNotification(null)
        },5000)
        setPersons(persons.filter(n=>n.name !== newName))
      })
      
      return
    }

      personServices.create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhoneNumber('')
        setNotifType(null)
        setNotification(`Added ${returnedPerson.name}`)
        setTimeout(()=>{
          setNotification(null)
        },5000)
      })
  }

  const handleFilter = (e)=> setNewFilter(e.target.value)
  
  const handleNameInput = (e)=>{
    setNewName(e.target.value)
  }

  const handleNumInput = (e)=>{
    setNewPhoneNumber(e.target.value)
  }

  const deletePerson = (person) => {
    window.confirm(`Delete ${person.name}?`)&&personServices.deletePerson(person.id)
  }

  //end of handlers

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notifType}/>
      <Filter handleFilter={handleFilter} value={newFilter}/>
      <h3>Add a new</h3>
      <Form 
        handleSubmit={handleSubmit} 
        handleNameInput={handleNameInput} 
        handleNumInput={handleNumInput}
        inputRef={inputRef}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} del={deletePerson}/>
      
    </div>
  )
}

export default App
