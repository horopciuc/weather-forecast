const GEOCODING_API_URL = import.meta.env.VITE_GEOCODING_API_URL;
const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;

export const fetchCityCoordinates = async (city) => {
  const response = await fetch(
    `${GEOCODING_API_URL}?name=${city}&count=1&language=en&format=json`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch city coordinates");
  }
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return data.results[0];
  } else {
    throw new Error("City not found");
  }
};

export const fetchWeatherData = async (latitude, longitude) => {
  const response = await fetch(
    `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const data = await response.json();
  return data;
};

export const transformWeatherData = (data) => {
  const hourlyTimes = data.hourly.time;
  const hourlyTemperatures = data.hourly.temperature_2m;

  const today = new Date().toISOString().split("T")[0];

  const filteredData = hourlyTimes
    .map((time, index) => ({
      time,
      temperature: hourlyTemperatures[index],
    }))
    .filter(({ time }) => time.startsWith(today));

  const interval = 2; // 2 hours
  const result = filteredData
    .filter((_, index) => index % interval === 0)
    .map(({ time, temperature }) => {
      const date = new Date(time);
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return {
        x: formattedTime,
        y: temperature,
      };
    });

  return result;
};
