import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [locationPermission, setLocationPermission] = useState(false);
  const [location, setLocation] = useState(null);
  const [updateLocation, setUpdateLocation] = useState(false);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      setLocationPermission(true);
    } else {
      console.log('Location permission granted');
    }
  };

  const getLocation = async () => {
    if (!locationPermission) return;
    const locationData = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: locationData.coords.latitude,
      longitude: locationData.coords.longitude
    });
  };

  useEffect(() => {
    getLocationPermission();
    if (updateLocation) {
      getLocation();
      setUpdateLocation(false);
    }
  }, [updateLocation]);

  return (
    <View style={styles.container}>
      <Button title="Open React Native Docs" onPress={() => Linking.openURL("https://reactnative.dev")} />
      <Button title="Open Tampere On maps" onPress={() => Linking.openURL("geo:61.4978,23.7610")} />
      <Button title="Get location" onPress={() => setUpdateLocation(true)} />

      {location ? (
        <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
      ) : (
        <Text>No location data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20},
  text: { fontSize: 24, fontWeight: 'bold' },
});
