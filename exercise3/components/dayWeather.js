// Shows the weather for a specific day
import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import weatherIcons from './weatherIcons';


export default function DayWeather({ route }) {
  const { date, data } = route.params
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const dayData = data.find((item) => item.date === date);
      setWeatherData(dayData);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.dateText}>{weatherData.date}</Text>
        <Image source={{ uri: weatherIcons(weatherData.weatherCode) }} style={{ width: 75, height: 75, alignSelf: 'center' }} />
        <Text style={styles.weatherText}>Weather: {weatherData.weatherCode}</Text>
        <Text style={styles.tempText}>Temperature High: {weatherData.tempMax}°C</Text>
        <Text style={styles.tempText}>Temperature Low: {weatherData.tempMin}°C</Text>
        <Text style={styles.windText}>Wind speed: {weatherData.windSpeedMax} m/s</Text>
        <Text style={styles.uvText}>UV Index: {weatherData.uvIndexMax}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    gap: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherText: {
    fontSize: 14,
  },
  tempText: {
    fontSize: 14,
  },
  uvText: {
    fontSize: 14,
  },
  windText: {
    fontSize: 14,
  },
});
