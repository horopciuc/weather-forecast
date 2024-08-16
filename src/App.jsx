import { useState, useEffect } from "react";
import classes from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherChart from "./components/WeatherChart/WeatherChart";
import ErrorModal from "./components/ErrorModal/ErrorModal";

import {
  fetchCityCoordinates,
  fetchWeatherData,
  transformWeatherData,
} from "./services/weatherService";

import { CircularProgress } from "@mui/material";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    const bookmarkedCity = localStorage.getItem("city");
    if (bookmarkedCity) {
      handleSearch(bookmarkedCity);
    }
  }, []);

  const handleSearch = async (searchCity) => {
    setCity(searchCity);
    setLoading(true);
    setError(null);

    try {
      // Check if data is cached
      const cachedWeatherData = localStorage.getItem(
        `weatherData-${searchCity}`
      );
      if (cachedWeatherData) {
        setWeatherData(JSON.parse(cachedWeatherData));
        setLoading(false);
        return;
      }

      // Fetch city coordinates
      const cityData = await fetchCityCoordinates(searchCity);

      // Fetch weather data
      const weatherData = await fetchWeatherData(
        cityData.latitude,
        cityData.longitude
      );

      const processedData = transformWeatherData(weatherData);

      setWeatherData(processedData);
      localStorage.setItem(
        `weatherData-${searchCity}`,
        JSON.stringify(processedData)
      );
      localStorage.setItem("city", searchCity);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setError(null);
  };

  return (
    <div className={classes.appWrapper}>
      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      )}
      {!loading && weatherData.length > 0 && (
        <WeatherChart data={weatherData} />
      )}
      {error && (
        <ErrorModal open={!!error} onClose={closeModal} message={error} />
      )}
    </div>
  );
}

export default App;
