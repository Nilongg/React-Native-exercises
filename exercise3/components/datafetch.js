import { fetchWeatherApi } from 'openmeteo';

export default async function getCurrentCityWeather(day, week, city) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;
  let params;

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

    console.log("Day:", day)
    console.log("Week:", week)
    console.log("City:", city)

    const fetcher = getWeather(day, week, lat, lon);
    return await fetcher;

  } catch (error) {
    console.error('Error:', error);
    return { error: error };
  }
};

const getWeather = async (day, week, lat, lon) => {
  let responses;
  let response;
  let params;
  let utcTimes;
  let helsinkiDays;
  const url = "https://api.open-meteo.com/v1/forecast";

  if (day) {
    console.log("Day");
    params = {
      "latitude": lat,
      "longitude": lon,
      "current": ["temperature_2m", "weather_code", "wind_speed_10m"],
      "timezone": "auto"
    };

  } else if (week) {
    console.log("Week");
    params = {
      "latitude": lat,
      "longitude": lon,
      "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "uv_index_max", "wind_speed_10m_max"],
      "timezone": "auto"
    };
  }

  try {
    responses = await fetchWeatherApi(url, params);
    response = responses[0];

  } catch (error) {
    console.error('Error:', error);
  }

  const current = responses[0].current();
  const daily = responses[0].daily();
  const utcOffsetSeconds = response.utcOffsetSeconds();
  
  if(week) {
    utcTimes = range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
      function (t) {
        return new Date((t * 1000 + utcOffsetSeconds));
      }
    );
    helsinkiDays = utcTimes.map((t) => {
      return t.toLocaleDateString('fi-FI', {
        timeZone: 'Europe/Helsinki',
        day: '2-digit', // Two-digit day
        month: '2-digit', // Two-digit month
        year: 'numeric' // Full year
      });
    });
  }
  const utcTime = week ? new Date(Number(daily.time()) * 1000 + utcOffsetSeconds) : new Date(Number(current.time()) * 1000 + utcOffsetSeconds);

  // Get date in "day/month/year" format (Helsinki time zone)
  const helsinkiDay = utcTime.toLocaleDateString('fi-FI', {
    timeZone: 'Europe/Helsinki',
    day: '2-digit', // Two-digit day
    month: '2-digit', // Two-digit month
    year: 'numeric' // Full year
  });
  
  const weatherData = () => {
    let date = '';
    let temperature2m = '';
    let weatherCode = '';
    let windSpeed10m = '';
    let tempMax = '';
    let tempMin = '';
    let uvIndexMax = '';
    let windSpeedMax = '';
    let stringWeatherCode = [];
    
    if (day) {
      date = helsinkiDay;
      temperature2m = current.variables(0).value();
      weatherCode = current.variables(1).value();
      windSpeed10m = current.variables(2).value();
    }
    else if (week) { 
      date = helsinkiDays;
      weatherCode = daily.variables(0).valuesArray();
      tempMax = daily.variables(1).valuesArray();
      tempMin = daily.variables(2).valuesArray();
      uvIndexMax = daily.variables(3).valuesArray();
      windSpeedMax = daily.variables(4).valuesArray();
    }

    if (weatherCode instanceof Float32Array) {
      for (let i = 0; i < weatherCode.length; i++) {
        let code = convertWeatherCode(weatherCode[i]);
        stringWeatherCode.push(code);
      }
    } else if(typeof weatherCode == 'number') {
      weatherCode = convertWeatherCode(weatherCode);
    }

    if(day) {
      return {
        date,
        temperature2m,
        weatherCode,
        windSpeed10m
      };
    } else if(week) {
      return {
        date,
        stringWeatherCode,
        tempMax,
        tempMin,
        uvIndexMax,
        windSpeedMax
      };
    }
  }
  return weatherData();
}

function range(start, end, step = 1) {
  let result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

function convertWeatherCode(weather_code) {
  switch (weather_code) {
    case 0:
      return 'Clear sky';
    case 1:
      return 'Mainly clear';
    case 2:
      return 'Partly cloudy';
    case 3:
      return 'Overcast';
    case 45:
      return 'Fog';
    case 48:
      return 'Rime fog';
    case 51:
      return 'Light Drizzle';
    case 53:
      return 'Drizzle';
    case 55:
      return 'Dense Drizzle';
    case 56:
      return 'Light Freezing Drizzle';
    case 57:
      return 'Dense Freezing Drizzle';
    case 61:
      return 'Light Rain';
    case 63:
      return 'Rain';
    case 65:
      return 'Heavy Rain';
    case 66:
      return 'Light Freezing Rain';
    case 67:
      return 'Heavy Freezing Rain';
    case 71:
      return 'Light Snowfall';
    case 73:
      return 'Snowfall';
    case 75:
      return 'Heavy Snowfall';
    case 77:
      return 'Snow grains';
    case 80:
      return 'Slight rain showers';
    case 81:
      return 'Moderate rain showers';
    case 82:
      return 'Heavy rain showers';
    case 85:
      return 'Slight snow showers';
    case 86:
      return 'Heavy snow showers';
    case 95:
      return 'Thunderstorm: Slight or moderate';
    case 96:
      return 'Light thunderstorm with hail'
    case 99:
      return 'Heavy thunderstorm with hail';
    default:
      return 'Unknown weather condition';
  }
}
