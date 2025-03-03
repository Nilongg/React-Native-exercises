export default function weatherIcons(weather) {
  switch (weather) {
    case 'Mainly clear':
    case 'Clear sky':
      return 'https://img.icons8.com/?size=100&id=RmaBng6VAAfy&format=png&color=000000';
    case 'Overcast':
    case 'Partly cloudy':
      return 'https://img.icons8.com/?size=100&id=YFTDNKUQsd1f&format=png&color=000000';
    case 'Fog':
    case 'Rime Fog':
      return 'https://img.icons8.com/?size=100&id=g1tIPPIl9uWj&format=png&color=000000'
    case 'Drizzle':
    case 'Light Drizzle':
    case 'Rain':
    case 'Light Rain':
    case 'Heavy Rain':
    case 'Heavy Rreezing Rain':
    case 'Light Freezing Rain':
    case 'Slight rain showers':
    case 'Moderate rain showers':
    case 'Heavy rain showers':
      return 'https://img.icons8.com/?size=100&id=GoD5DKmOlrad&format=png&color=000000'
    case 'Snowfall':
    case 'Light Snowfall':
    case 'Heavy Snowfall':
    case 'Snow grains':
    case 'Slight snow showers':
    case 'Heavy snow showers':
      return 'https://img.icons8.com/?size=100&id=NJAQzSYMvh0Z&format=png&color=000000'
    case 'Thunderstorm: Slight or moderate':
    case 'Light thunderstorms with hail':
    case 'Heavy thunderstorms with hail':
      return 'https://img.icons8.com/?size=100&id=7dsAqrYfbfTt&format=png&color=000000'
    default:
      return 'https://img.icons8.com/?size=100&id=ehdb6JvTjIW9&format=png&color=000000';
  }

};