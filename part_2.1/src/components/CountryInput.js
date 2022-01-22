import React from 'react'

const CountryInput = ({handleCountryInput}) => {
    
    return (
        <input onChange={handleCountryInput}/>
    )
}

export default CountryInput