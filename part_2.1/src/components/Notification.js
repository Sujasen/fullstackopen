import React from 'react'

const Notification = ({css, message}) => {
    if (message === null) {
        return null
      }

    return (
        <div className={css}>
            {message}
        </div>
    )
}

export default Notification