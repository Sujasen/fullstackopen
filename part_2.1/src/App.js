import React, {useState, useEffect} from 'react'
import Course from './components/Course'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import FindCountries from './components/FindCountries'
import axios from 'axios'
import phoneService from './services/phoneService'
import Notification from './components/Notification'
import Footer from './components/Footer'



function App() {
  const course = [
    {
      id: 1,
      name:  'Half Stack application development',
      parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id:1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id:2
          },
          {
            name: 'State of component',
            exercises: 14,
            id:3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
      ]
    },
    {
      name: 'Node.js',
      id:2,
      parts:[
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  ///////////////////////////////////////////////////////
  // PhoneBook
  ///////////////////////////////////////////////////////
  useEffect(() => {
    phoneService
      .getAll()
      .then(response => {
          setPersons(response)
        })
    }, [] )

  const [newName,   setNewName  ]  = useState('')
  const [newNumber, setNewNumber]  = useState('')
  const [filter,    setFilter   ]  = useState('')
  const [persons,   setPersons  ]  = useState([])
  const [phoneMsg,  setPhoneMsg ]  = useState(null)
  const [cssClass,  setCssClass ]  = useState(null)
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  }

  const handleAddPerson = (event) => {

    event.preventDefault();
    const alreadyExist = persons.some( person => person.name === newName);


    if (newName === '' || newNumber === '')
    {
      // alert('Missing contact information.');
      setCssClass('error')
      setPhoneMsg('Missing contact information')

      setTimeout(() => {
        setPhoneMsg(null)
      }, 5000)
      return;
    }

    if (!alreadyExist){
      const personObject = 
        {
          name: newName,
          number: newNumber
        }

      phoneService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response));

          setCssClass('valid')
          setPhoneMsg(`${newName} was added to the phonebook.`)
    
          setTimeout(() => {
            setPhoneMsg(null)
            setNewName('');
            setNewNumber('');
          }, 5000)
        })
        .catch(error => {

          setCssClass('error')
          setPhoneMsg(`${error.response.data}`)
    
          setTimeout(() => {
            setPhoneMsg(null)
            setNewName('');
            setNewNumber('');
          }, 5000)
        })
    }
    else {
      const result = window.confirm(`${newName} already exists in the phonebook, stupid. Replace old number with new?`)

      if(result)
      {
        const curPerson = persons.find(temp => temp.name === newName)
        const newPerson =  {...curPerson, number: newNumber}

        phoneService
          .update(newPerson.id, newPerson)
          .then(response => {
            const temp = persons.map((person) =>  person.id !== response.id ? person : response)
            setPersons(temp);

            setCssClass('valid')
            setPhoneMsg(`${newNumber} was added to the phonebook for ${newName}.`)
      
            setTimeout(() => {
              setPhoneMsg(null)
              setNewName('');
              setNewNumber('');
            }, 5000)

          })
      }
    }
  }

//////////////////////////////////////////////////////////////
///////// Countries
//////////////////////////////////////////////////////////////
const [countryObject,  setCountryObject  ]  = useState([])
const [countryDisplay, setCountryDisplay ]  = useState([])
//const [countryInput,   setCountryInput   ]  = useState('')


useEffect(() =>{
  axios.get('https://restcountries.com/v3.1/all')
       .then(response => {
        setCountryObject(response.data)
       })
},[])

const handleCountryInput = (event) => {
  const tempInput   = event.target.value.toLowerCase()

  if(tempInput === '')
  {
    setCountryDisplay([])
    return
  }
  else {
    const tempDisplay = countryObject.filter(country => 
                                            country.name.common.toLowerCase().includes(tempInput))
    setCountryDisplay(tempDisplay)
  }
}

  return (
 
    <div>

      <FindCountries handleCountryInput={handleCountryInput} countryDisplay={countryDisplay}/>

      <br/>
      <h2>Phonebook</h2>
      <Notification css={cssClass} message={phoneMsg}/>
      <PersonForm name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange} handlePerson={handleAddPerson}/>
      <h2>Numbers</h2>
      <Filter handleFilter={handleFilter}/>
      <Persons data={persons} filter={filter}/>
      
      <br/>

      <Course course={course[0]}/>
      <Course course={course[1]}/>
      <Footer />
    </div>
  );
}

export default App;
