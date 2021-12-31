import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props.part[0]);
  return (
    <div>
      <Part part={props.part[0]} exercise={props.exercise[0]} />
      <Part part={props.part[1]} exercise={props.exercise[1]} />
      <Part part={props.part[2]} exercise={props.exercise[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises { props.total}</p>
  )
}


const App = () => {
  const course    = 'Half Stack application development';
  const part      = ['Fundamentals of React', 'Using props to pass data', 'State of a component'];
  const exercise = [10, 7, 14]


  return (  
      <div>
        <Header  course={course}/>
        <Content part={part} exercise={exercise}/>
        <Total   total={exercise[0] + exercise[1] + exercise[2]} />
      </div>
    )
}

export default App;
