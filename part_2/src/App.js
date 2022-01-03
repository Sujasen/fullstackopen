import React, {useState} from 'react'
import Note from './components/Note'
import Course from './components/Course'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App({notes}) {
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
  //console.log('App Level: ', course);
  
  ///////////////////////////////////////////////////
  // Adding Comments
  ///////////////////////////////////////////////////
  const [comment, setComment]       = useState(notes);
  const [newComment, setNewComment] = useState('a new comment');
  const [showAll, setShowAll]       = useState(true);

  const addComment = (event) => {
    event.preventDefault(); // Prevents page refreshing.

    const commentObject = {
      content: newComment,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: comment.length + 1
    }

    setComment(comment.concat(commentObject))
    setNewComment('');
  }

  const handleCommentChange = (event) => {
    console.log(event.target.value);
    setNewComment(event.target.value);
  }

  // commentToShow returns an array
  const commentToShow = showAll ? comment : comment.filter(temp => temp.important === true);
  
  ///////////////////////////////////////////////////////
  // PhoneBook
  ///////////////////////////////////////////////////////
  const [newName,   setNewName]   = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,    setFilter]    = useState('')
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas'     , number: '(000) 111-2222' },
    { id: 2, name: 'Ada Lovelace'    , number: '39-44-5323523'  },
    { id: 3, name: 'Dan Abramov'     , number: '12-43-234345'   },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122'  }
  ])
  
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
      alert('Missing contact information.');
      return;
    }

    if (!alreadyExist){
      const personObject = [
        {
          id: persons.length + 1,
          name: newName,
          number: newNumber
          
        }
      ]
      
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
    else {
      alert(`${newName} already exists in the phonebook, stupid.`)
    }
  }

//////////////////////////////////////////////////////////////

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange} handlePerson={handleAddPerson}/>
      <h2>Numbers</h2>
      <Filter handleFilter={handleFilter}/>
      <Persons data={persons} filter={filter}/>
      
      <br/>
      <h1>Comments</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {commentToShow.map(note => <Note key={note.id} note={note}/>)}
      </ul>
      
      <form onSubmit={addComment}>
        <input value= {newComment} onChange={handleCommentChange}/>
        <button type="submit">save</button>
      </form>

      <br/>
      <Course course={course[0]}/>
      <Course course={course[1]}/>
    </div>
  );
}

export default App;
