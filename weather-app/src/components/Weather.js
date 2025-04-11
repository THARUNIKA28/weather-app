import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // Track if data is loaded
  const apiKey = process.env.REACT_APP_API_KEY;

  const getWeather = () => {
    if (!location) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setData(response.data);
        setIsLoaded(true); // Set to true once the data is loaded
        setLocation("");  // Clear the location input
      })
      .catch(() => {
        alert("City not found");
        setIsLoaded(false); // Reset if there was an error
      });
  };

  return (
    <div
      className={`weather-card ${isLoaded ? "open" : ""}`} // Apply 'open' class if data is loaded
    >
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={getWeather}>
          🔍
        </button>
      </div>

      {data && (
        <div className="weather-info">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <h2>{data.main.temp}°C</h2>
          <p className="description">{data.weather[0].description}</p>

          <div className="details">
            <p>💧 {data.main.humidity}% Humidity</p>
            <p>🌬️ {data.wind.speed} km/h Wind Speed</p>
          </div>
          <h4>{data.name}, {data.sys.country}</h4>
        </div>
      )}
    </div>
  );
};

export default Weather;
