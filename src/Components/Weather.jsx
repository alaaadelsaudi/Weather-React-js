import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";


export default function Weather() {
 


const api = "b8d1d0c18328e2276fb50588ff7ad9b9";

  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();

      // Extract one forecast for each day (e.g., at 12:00 PM)
      const dailyForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyForecast);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setForecast([]);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="container text-center">
      <div className="form">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-btn" onClick={fetchWeather}>
        <IoSearch />
        </button>
      </div>

      {forecast.length > 0 && (
        <div className="forecast">
          <h2 className="city">Weather in {city}</h2>
          <div className="forecast-list">
            {forecast.map((item, index) => (
              <div className="forecast-item" key={index}>
              <h4>{new Date(item.dt_txt).toLocaleDateString('en-GB')}</h4>
                <img
                  src={getWeatherIcon(item.weather[0].icon)}
                  alt={item.weather[0].description}
                />
                <p className="p-description">{item.weather[0].description}</p>
                <p>Temp: {item.main.temp} °C</p>
                <p>Humidity: {item.main.humidity}%</p>
                <p>Wind: {item.wind.speed} m/s</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

