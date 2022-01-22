import React from 'react'
import Part from './Part'

const Content = ({course}) => {

    //console.log('Content Level: ', course);
    return (
        <div>
            <table>
                <tbody>
                    {course.parts.map(part => 
                        <Part key={part.id} part={part}/>
                    )}
                </tbody>
            </table>

        </div>

    );
}

export default Content
