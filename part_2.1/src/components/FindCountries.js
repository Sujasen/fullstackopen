import React from 'react'
import CountryInput from './CountryInput'
import DisplayCountries from './DisplayCountries'

const FindCountries = ({handleCountryInput, countryDisplay}) =>{

    return (
        <div>
            Find countries <CountryInput handleCountryInput={handleCountryInput}/>
            <br/>
            <DisplayCountries countryDisplay={countryDisplay}/>

        </div>
    )
}

export default FindCountries