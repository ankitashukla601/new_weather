import React,{useEffect,useState} from 'react'
import axios from 'axios';

import './App.css'
import cloudimg from'./Images/cloud.png'
const Weatherapi2 = () => {


    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState();
  

//     const url = 'https://api.openweathermap.org/data/2.5/weather';
//     const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
//     await axios
//         .get(url, {
//             params: {
//                 q: input,
//                 units: 'metric',
//                 appid: api_key,
//             },
//         })
//         .then((res) => {
//             console.log('res', res);
//             setWeather({ data: res.data, loading: false, error: false });
//         })
//         .catch((error) => {
//             setWeather({ ...weather, data: {}, error: true });
//             setInput('');
//             console.log('error', error);
//         });
// }


// baseUrl + "current.json?key=" + apiKey + "&q=" + city + "&aqi=no"
    const fetchData = async () => {
        // const url = `https://api.openweathermap.org/data/2.5/weather`;
        const api_key = '03fda2ef11344a5ebc7103429241104';
        const days=8;
       const url="http://api.weatherapi.com/v1/current.json?key=" + api_key + "&q=" + city + "&aqi=no";        // const api_key = '3a9934d422fdbacf3c08f021f37c7bf1';
        
// const url=`http://api.weatherapi.com/v1/search.xml?key=03fda2ef11344a5ebc7103429241104&q=${city}`
      try {


        const response = await axios.get(url
        //   ,{ params: {
        //     q: city,
        //     units: 'metric',
        //     appid: api_key,
        // },}
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

  <div className=' card_out '>  
 <div className='card'>


<form onSubmit={handleSubmit}>

  <div className='search_div'>    
        <input className='search_inp'
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button className='srch_btn' type="submit">        <i class="fa fa-search" aria-hidden="true"></i>
</button></div>

<img src={cloudimg} alt="" className='cloudimg' />

      </form>

      {weatherData ? (
        <>
        <span>  
        <p> {weatherData.current.condition.text} </p>
        
          <i class="fa-solid fa-location-dot "></i>  {weatherData.location.name}</span>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>  Temperature:{weatherData.current.temp_f}f</p>

<img src={weatherData.current.condition.icon} alt="bj" />
         {/* //http://api.weatherapi.com/v1/current.json?key=03fda2ef11344a5ebc7103429241104&q=london&aqi="no" */}
          {/* <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like : {weatherData.main.feels_like}°C</p>
          <p>Humidity : {weatherData.main.humidity}%</p>
          <p>Pressure : {weatherData.main.pressure}</p>
          <p>Wind Speed : {weatherData.wind.speed}m/s</p>
          <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p> */}
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>

   
  
    </div>
  )
}

export default Weatherapi2