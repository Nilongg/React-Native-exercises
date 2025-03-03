import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, Platform } from 'react-native';
import DataFetch from './datafetch';

const WeekWeather = ({ route }) => {
  const {city, navigation } = route.params; // Get city from params
  const [renderData, setRenderData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const getWeekWeather = async () => {
    try {
      const weatherData = await DataFetch(false, true, city); 
      //console.log(weatherData); // Check the response structure

      // Check if weatherData is an object, then transform it into an array of objects
      if (weatherData && typeof weatherData === 'object') {
        const transformedData = weatherData.date.map((_, index) => ({
          date: weatherData.date[index],
          weatherCode: weatherData.stringWeatherCode[index],
          tempMax: Math.round(weatherData.tempMax[index]),
          tempMin: Math.round(weatherData.tempMin[index]),
          uvIndexMax: Math.round(weatherData.uvIndexMax[index]),
          windSpeedMax: Math.round(weatherData.windSpeedMax[index]),
        }));

        // Remove items with even 1 undefined value
        for (let i = 0; i < transformedData.length; i++) {
          for (const [key, value] of Object.entries(transformedData[i])) {
            console.log(key, value);
            if (value === undefined) {
              transformedData.splice(i, 1);
              break;
            }
          }
        }
        setRenderData(transformedData);
        setLoading(false); // Stop loading
      } else {
        setLoading(false); // If data isn't in the correct format, stop loading
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false); // If an error occurs, stop loading
    }
  };

  useEffect(() => {
    if (city) {
      getWeekWeather();
      console.log(renderData);
    }
  }, [city]); // Dependency on city only

  // If data is still loading, show loading message
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Use Platform.OS to conditionally render welcome message */}
        <Text style={{ fontSize: 20, textAlign: 'center', padding: 10 }}>
          {Platform.select({
            ios: `Welcome iOS user! Week Weather for ${city}`,
            android: `Welcome Android user! Here's the week weather for ${city}`,
            default: `Welcome unknown OS user! Week weather for ${city}`, // Default message for unknown platforms
          })}
        </Text>
      </View>
      <FlatList
        data={renderData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text onPress={() => navigation.navigate('DayDetails', { date: item.date, data: renderData })} style={styles.dateText}>{item.date}</Text>
            <Text style={styles.weatherText}>Weather: {item.weatherCode}</Text>
            <Text style={styles.tempText}>Max Temp: {item.tempMax}°C</Text>
            <Text style={styles.tempText}>Min Temp: {item.tempMin}°C</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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

export default WeekWeather;