import React from 'react'
import Note from './components/Note'
import Course from './components/Course'

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
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note}/>
        )}
      </ul>
      <br/>

      <Course course={course[0]}/>
      <Course course={course[1]}/>

    </div>
  );
}

export default App;
