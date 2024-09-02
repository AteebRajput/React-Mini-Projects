import React, { useContext, useState, useEffect } from "react";
import { CitiesDataContext } from "../../context-api/context";
import sunny from "../../assets/sunny.png";
import cloudy from "../../assets/cloudy.png";
import rainy from "../../assets/rainy.png";
import snowy from "../../assets/snowy.png";
import "./WeatherApp.css";
import Search from "../search/search";

export default function WeatherApp() {
  const { lat, lon, name } = useContext(CitiesDataContext);
  const [weatherState, setWeatherState] = useState('');
  const [temp, setTemp] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [wind, setWind] = useState('');
  const [humidity, setHumidity] = useState('');
  const [visibility, setVisibility] = useState('');

  useEffect(() => {
    if (lat || lon || !name) {
      getData();
    }
  }, [lat, lon, name]);

  const getData = async () => {
    const cityName = name || 'Karachi';
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${cityName}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '8c0ec0146cmsh45ab8811f7e275ap190b91jsnaddc5fa7dccf',
        'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      const temperatureInCelsius = result.main.temp - 273.15;
      setWeatherState(result.weather[0].main);
      setTemp(temperatureInCelsius.toFixed(1));
      setWind(result.wind.speed);
      setHumidity(result.main.humidity);
      setVisibility(result.visibility / 1000);
      
      const date = new Date(result.dt * 1000);
      const formattedDate = date.toLocaleDateString('en-GB');
      setCurrentDate(formattedDate);

    } catch (error) {
      console.error(error);
    }
  };

  const weatherImages = {
    Clear: sunny,
    Rain: rainy,
    Clouds: cloudy,
    Snow: snowy,
    Smoke: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherGradients = {
    Clear: "linear-gradient(to right, #f3b07c, #fcd283)", // Light blue gradient
    Rain: "linear-gradient(to right, #5bc8fb, #80eaff)", // Cool blue gradient
    Clouds: "linear-gradient(to right, #57d6d4, #71eeec)", // Soft gray gradient
    Snow: "linear-gradient(to right, #aff2ff, #fff)", // Icy blue gradient
    Smoke: "linear-gradient(to right, #A9A9A9, #C0C0C0)", // Muted gray gradient
    Haze: "linear-gradient(to right, #57d6d4, #71eeec)", // Light gray gradient
    Mist: "linear-gradient(to right, #57d6d4, #71eeec)", // Pale blue-gray gradient
  };

  const image = weatherState ? weatherImages[weatherState] : sunny;
  const gradient = weatherState ? weatherGradients[weatherState] : weatherGradients.Clear;

  return (
    <div className="main" style={{ background: gradient }}>
      <div className="weather" style={{background: gradient}}>
        <Search />
        <div className="weather-image">
          <img src={image} alt="Weather" />
        </div>
        <div className="weather-type">{weatherState || "Clear"}</div>
        <div className="weather-temp">{temp ? `${temp}°C` : "28°C"}</div>
        <div className="date">{currentDate || "06/08/2024"}</div>
        <div className="weather-data">
          <div className="humidity">
            <div className="name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">{humidity !== '' ? `${humidity}%` : "35%"}</div>
          </div>
          <div className="wind">
            <div className="name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">{wind !== '' ? `${wind} km/h` : "35 km/h"}</div>
          </div>
          <div className="visibility">
            <div className="name">Visibility</div>
            <i className="fa-solid fa-eye"></i>
            <div className="data">{visibility !== '' ? `${visibility} km` : "35 km"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
