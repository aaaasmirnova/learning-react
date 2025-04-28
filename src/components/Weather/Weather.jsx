import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const changeCity = (event) => {
    setCity(event.target.value);
  };

  const getWeatherForCity = async (event) => {
    event.preventDefault();
    try {
      const response = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1ee5ae595066d1e1710452837fd76c0e`
      );
      setWeather(response.data);
      setCity("");
    } catch (err) {
      console.error("Произошла ошибка!", err);
    }
  };

  console.log(weather);

  return (
    <div className="weather-app-wrapper">
      <div className="weather-app-inner-wrapper">
        <h1 className="weather-title">Weather app</h1>
        <form className="weather-form">
          <input
            type="text"
            placeholder="Put your city..."
            value={city}
            onChange={changeCity}
          />
          <button
            className="weather-send-button"
            type="submit"
            onClick={getWeatherForCity}
          >
            Send
          </button>
        </form>

        {weather && (
          <div className="weather-forecast-wrapper">
            <div>
              <p className="weather-city-info">{weather?.name}</p>
              <p className="weather-humidity-info">
                Humidity{" "}
                <span className="weather-humidity-result">
                  {weather?.main?.humidity} %
                </span>
              </p>
              <p>
                Wind{" "}
                <span className="weather-wind-result">
                  {Math.round(weather?.wind.speed)} m/s
                </span>
              </p>
            </div>
            <div className="weather-temperature-wrapper">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                className="weather-icon"
              />
              <p className="weather-temperature">
                {Math.round(weather?.main?.temp - 273.15)} °С
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
