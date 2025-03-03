import { fetchWeatherApi } from 'openmeteo';

export default async function getCurrentCityWeather(city) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'SchoolWeatherApp (niilo.vanhatupa@tuni.fi)'
      },
    });
    const json = await response.json();
    const lat = json[0].lat;
    const lon = json[0].lon;
    
    const fetcher = getWeather(lat, lon);
    return await fetcher;

  } catch (error) {
    console.error('Error:', error);
    return { error: error };
  }
};

const getWeather = async (lat, lon) => {
  var response;
  const url = "https://api.open-meteo.com/v1/forecast";
  const params = {
    "latitude": lat,
    "longitude": lon,
    "current": ["temperature_2m", "weather_code", "wind_speed_10m"],
    "timezone": "auto"
  };
  try {
    const responses = await fetchWeatherApi(url, params);
    response = responses[0];
  } catch (error) {
    console.error('Error:', error);
  }
  const current = response.current();

  const weatherData = () => {
    const temperature2m = current.variables(0).value();
    var weatherCode = current.variables(1).value();
    const windSpeed10m = current.variables(2).value();

    switch (weatherCode) {
      case 0:
        weatherCode = 'Clear sky';
        break;
      case 1:
        weatherCode = 'Mainly clear';
        break;
      case 2:
        weatherCode = 'Partly cloudy';
        break;
      case 3:
        weatherCode = 'Overcast';
        break;
      case 45:
        weatherCode = 'Fog';
      case 48:
        weatherCode = 'Rime fog';
        break;
      case 51:
        weatherCode = 'Light Drizzle';
        break;
      case 53:
        weatherCode = 'Drizzle';
        break;
      case 55:
        weatherCode = 'Dense Drizzle';
        break;
      case 56:
        weatherCode = 'Light Freezing Drizzle';
      case 57:
        weatherCode = 'Dense Freezing Drizzle';
        break;
      case 61:
        weatherCode = 'Light Rain';
        break;
      case 63:
        weatherCode = 'Rain';
        break;
      case 65:
        weatherCode = 'Heavy Rain';
        break;
      case 66:
        weatherCode = 'Light Freezing Rain';
        break;
      case 67:
        weatherCode = 'Heavy Freezing Rain';
        break;
      case 71:
        weatherCode = 'Light Snowfall';
        break;
      case 73:
        weatherCode = 'Snowfall';
        break;
      case 75:
        weatherCode = 'Heavy Snowfall';
        break;
      case 77:
        weatherCode = 'Snow grains';
        break;
      case 80:
        weatherCode = 'Slight rain showers';
        break;
      case 81:
        weatherCode = 'Moderate rain showers';
        break;
      case 82:
        weatherCode = 'Heavy rain showers';
        break;
      case 85:
        weatherCode = 'Slight snow showers';
        break;
      case 86:
        weatherCode = 'Heavy snow showers';
        break;
      case 95:
        weatherCode = 'Thunderstorm: Slight or moderate';
        break;
      case 96:
        weatherCode = 'Light thunderstorm with hail';
        break
      case 99:
        weatherCode = 'Heavy thunderstorm with hail';
        break;
      default:
        weatherCode = 'Unknown weather condition';
    }

    return {
      temperature2m,
      weatherCode,
      windSpeed10m
    };
  }
  return weatherData();
}