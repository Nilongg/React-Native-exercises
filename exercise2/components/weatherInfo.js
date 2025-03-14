// Displays the current temperature and wind speed and also some other information

import React from 'react';
import { Text, View} from 'react-native';
import { styles } from './styles';
import { useEffect } from 'react';
import DataFetch from './datafetch';

export default function weatherInfo({ temperature, setTemperature, windSpeed, setWindSpeed, city }) {
  useEffect(() => {
      const fetchWeather = async () => {
        const weatherData = await DataFetch(city);
        temp = weatherData.temperature2m;
        wind = weatherData.windSpeed10m;

        if (typeof temp == 'number') {
          temp = temp.toFixed(1);
        }
        if (typeof wind == 'number') {
          wind = wind.toFixed(1);
        }
        setTemperature(temp);
        setWindSpeed(wind);
      };
      fetchWeather();

      

    }, [city], []);  
  
  return (
    <View style={styles.weather}>
      <Text style={styles.info_title}>Additional info</Text>
      <Text style={styles.temperature} >Temperature: {temperature} C°</Text>
      <Text style={styles.windSpeed} >Wind speed: {windSpeed} KM/H</Text>
      <Text style={styles.info_title} >Other fields coming soon...</Text>
    </View>

)}