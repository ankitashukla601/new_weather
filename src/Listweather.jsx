import React,{useEffect,useState} from 'react'
import axios from 'axios';
const ListWeather = () => {


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
    const fetchData = async () => {
        const url = `https://api.openweathermap.org/data/2.5/forecast/daily`;
        const api_key = '03fda2ef11344a5ebc7103429241104';
      try {


        const response = await axios.get(url,{ params: {
            q: city,
            units: 'metric',
            appid: api_key,
        },}
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
    <div>


<form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData ? (
        <>
          <h2>{weatherData.city.name}</h2>
          <p>country: {weatherData.country}</p>
          <p>sunrise: {weatherData.list.sunrise}</p>
          <p>sunset  : {weatherData.list.sunset}</p>
          <p>population : {weatherData.population}%</p>
          <p> min temp : {weatherData.list.temp.min}</p>
          <p>max temp : {weatherData.list.temp.max}</p>

         
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  )
}

export default ListWeather