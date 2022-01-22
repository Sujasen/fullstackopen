import React from 'react'
import Content from './Content'

const Course = ({course}) => {

  //console.log('Course Level: ', course);
  const totalExercise = course.parts.map((part) => part.exercises)
                                    .reduce((sum, curVal) => sum+curVal);
  //console.log({totalExercise})

    return (
        <div>
            <h1>{course.name}</h1>
            <Content course={course}/>
            <b>{'Total of ' +   totalExercise + ' exercises'} </b>
        </div>
    )
}

export default Course;