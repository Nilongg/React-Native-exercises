import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, SafeAreaView } from 'react-native';
import { styles } from './components/styles';
import Footer from './components/Footer';
import Header from './components/header';
import WeekWeather from './components/WeekWeather';
import WeatherInfo from './components/weatherInfo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DayWeather from './components/dayWeather';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Tampere');
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [date, setDate] = useState(null); 
  const [navigator, setNavigation] = useState(null);

  useEffect(() => {
    setNavigation(navigation);
  }, []);


  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Pass navigation to Header */}
        <Header
          weather={weather}
          city={city} setCity={setCity}
          navigation={navigator}
        />
        <WeatherInfo
          temperature={temperature} setTemperature={setTemperature} 
          windSpeed={windSpeed} setWindSpeed={setWindSpeed} 
          date={date} setDate={setDate}
          city={city}
          setWeather={setWeather}
        />
        <Footer city={city} setDate={setDate} setWeather={setWeather} setWindSpeed={setWindSpeed} setTemperature={setTemperature} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={WeekWeather} />
        <Stack.Screen name="DayDetails" component={DayWeather} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}