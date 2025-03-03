import React from 'react';
import {StatusBar, ScrollView, SafeAreaView} from 'react-native';
import { styles } from './components/styles';
import Footer from './components/Footer';
import Header from './components/header';
import WeatherInfo from './components/weatherInfo';
import { useState } from 'react';

export default function App() {  
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Tampere');
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* StatusBar setup */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent" 
        translucent={true} 
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Header weather={weather} setWeather={setWeather} city={city} setCity={setCity} />
        <WeatherInfo temperature={temperature} windSpeed={windSpeed} 
         setWindSpeed={setWindSpeed} setTemperature={setTemperature} city={city} 
        />
        <Footer city={city} setWeather={setWeather} setWindSpeed={setWindSpeed} setTemperature={setTemperature}/>
      </ScrollView>
    </SafeAreaView>
  );
  
}