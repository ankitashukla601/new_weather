import React, {useEffect, useState} from "react";

const TempApp = () =>
{

    const[ city, setCity] = useState(null);
    const[ search, setSearch] = useState("");
 const fetchApi = async() =>
        {
            const url =`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=3a9934d422fdbacf3c08f021f37c7bf1`;
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(resJson.main);
        }
   useEffect(()=>{
    fetchApi()
   },[search])


   
    return (
        <div className="box">
            <div className="InputData">
                <input 
                type="search"
                className="InputField"
                onChange = { (event) => {
                    setSearch(event.target.value)

                }} />
            {
                !city?
                (   <div>
                    <h3><b>No Data Found</b></h3>
               
            </div>
                ) :
                (
                    <div>
                    <div className="info">
                    <h2 className="location">
                    <i class="fas fa-street-view"></i>{search}
                    </h2>
                    <h1 className="temp">
                    {city.temp}
                    </h1>
                    <h3 className="tempmin_max">{city.temp_min} Cel| {city.temp_max}Cel</h3>
             <h3> {city.hour}</h3>   </div>
                <div className="wave- one"></div>
                
                <div className="wave- two"></div>
                
                <div className="wave- three"></div>
              
            </div> 

                )
            }

            </div> 
        </div>
    )
}
 
export default TempApp;