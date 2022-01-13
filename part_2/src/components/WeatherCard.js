import React, { useState, useEffect } from 'react'
import axios from 'axios'




const WeatherCard = ({data}) => {
    const [forecast, setForecast] = useState({
        weather: [{ icon:  0 }],
        main:    { temp:   0 } ,
        wind:    { speed:  0   , deg: 'Hello' }
    })

    const api_key = process.env.REACT_APP_API_KEY

    const compass=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]

    useEffect(() =>{
         axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + data.name.common +'&appid=' + api_key + '&units=imperial')
              .then(response => {
                  console.log(response.data)
                  response.data.wind.deg = compass[Math.floor(((response.data.wind.deg/22.5) + 5) % 16)]
                  response.data.weather[0].icon = 'http://openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png'
                  setForecast(response.data)
              })
       },[])


    return (
        <div>
            <h1>Weather in {data.capital}</h1>
            <p><b>Temperature: </b>{forecast.main.temp} fahrenheit</p>
            <img src={forecast.weather[0].icon} ></img>
            <p><b>wind: </b>{forecast.wind.speed} mph direction {forecast.wind.deg}</p>

        </div>
    )

}

export default WeatherCard