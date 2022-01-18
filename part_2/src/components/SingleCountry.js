import React from 'react'
import WeatherCard from './WeatherCard'

const SingleCountry = ({data}) => {
    const lang = Object.values(data.languages)
    return (
        <div>
            <h1>{data.name.common}</h1>
            <ul>
                <li key='Capital'>Capital: {data.capital}</li>
                <li key='Population'>Population: {data.population}</li>
            </ul>
            <h1>Languages</h1>
            <ul>
                {lang.map(language => 
                    <li key={language}> 
                        {language}
                    </li> )}
            </ul>
            <img alt="1" src={data.flags['png']} ></img>
            <WeatherCard data={data}/>
        </div>
    )

}

export default SingleCountry;