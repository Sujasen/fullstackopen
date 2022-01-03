import React from 'react'

const Filter = ({handleFilter}) => {
    
    return (
    <div>
        Name Filter <input onChange={handleFilter}/>
    </div>)
}

export default Filter