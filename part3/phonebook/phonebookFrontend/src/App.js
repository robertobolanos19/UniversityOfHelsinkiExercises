import { useState, useEffect } from 'react'

import personServices from './services/persons'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {

  //*persons data
  const [persons, setPersons] = useState([])
  //*Inputs
  const [newFilterInputField, setNewFilterInputField] = useState('')
  const [newNameInputField, setNewNameInputField] = useState('')
  const [newPhoneNumberInputField, setNewPhoneNumberInputField] = useState('')
  //*notifications
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(()=>{
  personServices.getAll()
  .then(initialPersons =>{
    setPersons(initialPersons)
  })
  },[])

  //*handlers
  const handleFilter = (e)=> setNewFilterInputField(e.target.value)
  
  const handleNameInput = (e)=>{
    setNewNameInputField(e.target.value)
  }

  const handleNumInput = (e)=>{
    setNewPhoneNumberInputField(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    const newPerson = 
    {
      name:newNameInputField,
      number:newPhoneNumberInputField
    }  

    if(persons.map((p)=>p.name).includes(newNameInputField))
    {
      window.confirm(`${newNameInputField} is already added to the phonebook, replace the old number with a new one?`) &&
      personServices
      .update(persons.filter(p=>p.name === newNameInputField)[0].id, newPerson)
      .then(response =>{
        personServices.getAll()
        .then(response =>{
          setPersons(response)
          setNewNameInputField('')
          setNewPhoneNumberInputField('')
          setNotificationType(null)
          setNotification(`Changed ${newPerson.name}'s number`)
          setTimeout(()=>{
            setNotification(null)
          },5000)
        })
      })
      .catch(error =>{
        setNotificationType('error')
        setNotification(`${newNameInputField} was already removed from server`)
        setTimeout(()=>{
          setNotificationType(null)
          setNotification(null)
        },5000)
        setPersons(persons.filter(n=>n.name !== newNameInputField))
      })
      
      return
    }

    else if(newNameInputField===""||newPhoneNumberInputField==="")
    {
      setNotificationType('error')
        setNotification('All fields must be used')
        setTimeout(()=>{
          setNotification(null)
      },5000)
      return
    }

      personServices.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewNameInputField('')
        setNewPhoneNumberInputField('')
        setNotificationType(null)
        setNotification(`Added ${returnedPerson.name}`)
        setTimeout(()=>{
          setNotification(null)
        },5000)
      })
  }

  const handleDeleteContact = (person)=>{
    window.confirm(`Delete ${person.name}?`)
    &&personServices.deletePerson(person.id)
    .then(response=>{
      setPersons(persons.filter(p=> p.id !== person.id))
      setNotification(`${person.nam} has just been deleted!`)
      setNotificationType(null)
      setTimeout(()=>{
        setNotification(null)
      },5000)
    })
    .catch(error=>{
      setNotificationType('error')
      setNotification(`${person.name} can't be deleted since it was already deleted`)
      setTimeout(()=>{
        setNotification(null)
      },5000)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType}/>
      <Filter handleFilter={handleFilter} value={newFilterInputField}/>
      <h3>Add a new</h3>
      <Form 
        handleSubmit={handleSubmit} 
        handleNameInput={handleNameInput} 
        handleNumInput={handleNumInput}
        nameVal={newNameInputField}
        newPhoneNumberVal={newPhoneNumberInputField}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilterVal={newFilterInputField} del={handleDeleteContact}/>
      
    </div>
  )
}

export default App
