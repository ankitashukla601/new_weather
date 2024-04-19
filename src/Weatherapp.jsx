import React from 'react'
import  { useEffect, useState } from 'react';
import axios from 'axios';
const Weatherapp = () => {


    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
  
      console.log("Latitude is:", lat)
      console.log("Longitude is:", long)
    }, [lat, long]);
    const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city },{country code}&appid={API key}`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  return (
    <div className='card'>
      <form onSubmit={handleSubmit}>

        <div> 
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        </div>
        <button type="submit">Get Weather</button>
      </form>
      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like : {weatherData.main.feels_like}°C</p>
          <p>Humidity : {weatherData.main.humidity}%</p>
          <p>Pressure : {weatherData.main.pressure}</p>
          <p>Wind Speed : {weatherData.wind.speed}m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}

    </div>
  )
}

export default Weatherapp