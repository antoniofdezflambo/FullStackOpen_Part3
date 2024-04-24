import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from "./components/Form";
import Numbers from './components/Numbers';
import personsService from './services/persons'
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personsService.
    getAll().
    then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(newNumber !== '' && newName !== '') {
      const personsCopy = [...persons]

      if(personsCopy.map(person => person.name).includes(newName)) {
        const person = personsCopy.find(person => person.name === newName)
        
        if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          const newPerson = {...person, number: newNumber}

          personsService.
          update(person.id, newPerson).
          then(updatedPerson => {
            const updatedPersons = persons.map(person => person.id === updatedPerson.id ? updatedPerson : person)
            setPersons(updatedPersons)
            setNewName('')
            setNewNumber('')

            changeNotification(`Updated ${person.name}'s number`)
          }).catch(() => {
            changeError(`Information of ${person.name} has already been removed from server`)
          })
        }
      } else {
        const newPerson = {name: newName, number: newNumber}

        personsService.
        create(newPerson).
        then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          changeNotification(`Added ${newPerson.name}`)
        })
        .catch(error => 
          changeError(error.response.data.error)
        )
      }
    }
  }

  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const changeFilter = (event) => {
    setFilter(event.target.value)
  }

  const deleteClick = (id) => {
    const person = persons.find(person => person.id === id)

    if(window.confirm(`Eliminar ${person.name}?`)){
      personsService.
      remove(id).
      then(() => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
      })
    }
  }

  const changeNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  const changeError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={changeFilter} />
      <Form
        name={newName}
        number={newNumber}
        handleSubmit={addPerson} 
        handleChangeName={changeName} 
        handleChangeNumber={changeNumber} 
      />
      <Notification message={notification} />
      <ErrorNotification errorMessage={errorMessage} />
      <Numbers persons={persons} filter={filter} handleClick={deleteClick} />
    </div>
  )
}

export default App