import React, { useEffect, useState, useRef} from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import drizzleIcon from '../assets/drizzle.png'
import cloudyIcon from '../assets/cloud.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'


const Weather = () => {
    const inputRef = useRef(null);
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudyIcon,
    "02n": cloudyIcon,
    "03d": cloudyIcon,
    "03n": cloudyIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,   
    }

    const search = async (city) => {
        if(city === '') {
            alert('Please enter a city name');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'City not found');
                return;
            }

            console.log(data);
            const icon= allIcons[data.weather[0].icon] || clearIcon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon

            })

        } catch (error) {
            setWeatherData(false);
            console.error('Error fetching weather data:', error);
        }
    }

    useEffect(() => {
        search('kolkata');
    }, []);


  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref = {inputRef} type="text" placeholder='Search' />
            <img src={searchIcon} alt="search" onClick={()=> search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temp'>{weatherData.temperature}° c</p>
        <p className='location'>{weatherData.location} </p>
        <div className="weather-data">
            <div className="col">
                <img src={humidityIcon} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span> Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={windIcon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km/sec</p>
                    <span> Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
        
        
    </div>
  )
}

export default Weather
