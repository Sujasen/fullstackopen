import React from 'react'

const Notification = ({message, nameClass}) => {
    
    if(message === null){
        return null
    }

    return(
        <div  className={nameClass}>
            {message} 
        </div>

    )
}

export default Notification