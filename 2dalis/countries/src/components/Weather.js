import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Weather = ({city}) => {
const api= `http://api.weatherstack.com/current?access_key=04d0ffea8ad7a897cfab8b0816c95a80&query=${city}`
 
const [weatherreport,setweatherreport] = useState([])

  useEffect(()=>{
    axios
    .get(api)
    .then(response => {
      setweatherreport(response.data)
    })
  },[])

  return (
    <div>
    <div><b>temperature is:</b> {weatherreport.current?.temperature} Celsius</div>
    <div><img alt="Nematau oro" src={weatherreport.current?.weather_icons} height="100" width="100"/></div>
    <div><b>wind:</b>{weatherreport.current?.wind_speed} ms </div>
    </div>
  )
}

export default Weather