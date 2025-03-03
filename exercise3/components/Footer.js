// Contains the footer of the website which includes:
// running, driving and pollen levels, city search bar and a refresh button

import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { styles } from './styles';
import datafetch from './datafetch';

export default function Footer({ city, setDate, setWeather, setWindSpeed, setTemperature }) {
  const refresh = async () => {
    console.log("Refresh");
    const weatherData = await datafetch(true, false, city);
    setWeather(weatherData.weatherCode);
    var temp = weatherData.temperature2m;
    var wind = weatherData.windSpeed10m;
    const date = weatherData.date;
    if (typeof temp == 'number') {
      temp = temp.toFixed(1);
    }
    if (typeof wind == 'number') {
      wind = wind.toFixed(1);
    }
    setDate(date);
    setTemperature(temp);
    setWindSpeed(wind);
    
  };
  
  return (
    <View style={styles.Footer}>
      <Button title="Refresh" onPress={() =>  refresh()} color="black" />
    </View>
  )

}