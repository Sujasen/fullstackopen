import React, { useState, useEffect } from 'react'
import SingleCountry from './SingleCountry';


const DisplayCountries = ({countryDisplay}) => {

    const [countryList, setCountryList] = useState(countryDisplay);
    useEffect(() => setCountryList(countryDisplay), [countryDisplay] )
    
   const handleButton = (country) => {
       const temp = [country]
       setCountryList(temp)
    }
    
    if (countryList.length === 0){
        return (
            <p>No countries found</p>
        )
    }
    else if (countryList.length === 1)
    {
        return(
            <SingleCountry data={countryList[0]}/>
        )
    }
    else if (countryList.length > 20)
    {
        
        return (
            <div>
                <p>Too many countries to display</p>
            </div>
        )
    }
    else if (countryList.length <= 20){

        return (
            <div>
                <table>
                    <tbody>
                        {countryList.map((country, index) => 
                            <tr key = {index}>
                                <td>
                                    {country.name.common}
                                </td>
                                <td>
                                    <button id = {index} onClick={() => handleButton(country)}>
                                        Show
                                    </button>
                                </td>
                            </tr> 
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DisplayCountries;