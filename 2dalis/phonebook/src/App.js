import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './servises/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [searchName,setSearchName]=useState('')
  const [confirmMessage,setConfirmMessage] = useState(null)

  useEffect(()=>{
    personService
    .getAll()
    .then(initialPersons=>{
     setPersons(initialPersons)
  })
},[])

  const personToShow=persons.filter(a=>a.name.includes(searchName))
  const hadleSearchChange=(event)=>{
    setSearchName(event.target.value)
  }

  const handlePerson = (event) => {
event.preventDefault()
    const id=event.target.value;
    const person = persons.find((a) => a.id == id); 
    const deletePerson = window.confirm(`Delete ${person.name}?`)
    if(deletePerson) {
      personService
      .remove(id)
      .then(response => {
          setPersons(persons.filter(person => person.id !== id))
      })
    } 
  }

  const addName = (event) => {
    event.preventDefault()
    const duplicateCheck = persons.find(person => person.name === newName)
    if(typeof duplicateCheck === 'undefined'){
    const nameObject = {
      name: newName,
      number: newNumber,
      
    }
    personService
    .create(nameObject)
    .then(returnedPerson=>{
    setPersons(persons.concat(returnedPerson))
    setConfirmMessage(`Added ${returnedPerson.name}.`)
    
     
    })
    .catch(error => {
    console.log('fail')
  })

  } else { if( window.confirm(`${newName} is already added to phonebook`)){
  const existingPerson={...duplicateCheck,number:newNumber}
  personService.update(existingPerson)
  .then(returnedPerson=>{
    setPersons(persons.map(person => person.id===returnedPerson.id?returnedPerson:person))
    setConfirmMessage(`Updated ${newName}`)
  })
  .catch(error => {
    console.log('fail')
})
  }
  }
setNewName(' ')
setNewNumber(' ')
   
}
   const handleNameChange = (event) => {
     
    setNewName(event.target.value)
  }
  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={confirmMessage} />
      <Filter title='filter shown with'
name={searchName} handleFunction={hadleSearchChange}
      />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} 
      handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons persontoshow={personToShow} deletePerson={handlePerson}/>
    </div>
  )
}

export default App