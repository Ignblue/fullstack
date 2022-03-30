import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './servises/persons'
import Notification from './components/Notification'

const App = () =>
{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [confirmMessage, setConfirmMessage] = useState(null)

  useEffect(() =>
  {
    personService.getAll()
      .then(res =>
      {
        setPersons(res)
      })
  }, [])

  const personToShow = persons.filter(a => a.name.includes(searchName))

  const hadleSearchChange = (event) =>
  {
    setSearchName(event.target.value)
  }

  const handlePerson = (event) =>
  {
    event.preventDefault()

    const id = event.target.value;
    const person = persons.find((a) => a.id == id);

    //delete

    if (window.confirm(`Delete ${person.name}?`))
    {
      personService.remove(id)
        .then(() => personService.getAll())
        .then((res) =>
        {
          setPersons(res)
          setConfirmMessage(`deleted ${person.name}.`)
        })
    }
  }

  const addName = (event) =>
  {
    event.preventDefault()

    const duplicate = persons.find(person => person.name === newName)

    if (duplicate === undefined)
    {
      //create new

      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService.create(nameObject)
        .then(() => personService.getAll())
        .then((res) =>
        {
          setPersons(res)
          setConfirmMessage(`Added ${nameObject.name}.`)
        })
        .catch(error =>
        {
          console.log('fail', error)
        })
    }
    else
    {
      //update number

      if (window.confirm(`Update ${newName}?`))
      {
        const nameObject = {
          name: duplicate.name,
          number: newNumber
        }

        personService.update(duplicate.id, nameObject)
          .then(() => personService.getAll())
          .then((res) =>
          {
            setPersons(res)
            setConfirmMessage(`Updated ${nameObject.name}.`)
          })
          .catch(error =>
          {
            console.log('fail', error)
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>
  {
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
        handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persontoshow={personToShow} deletePerson={handlePerson} />
    </div>
  )
}

export default App