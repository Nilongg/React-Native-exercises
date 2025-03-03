import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscribe = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
    Accelerometer.setUpdateInterval(100);

    return () => subscribe.remove();
  }, []);

  const isTilted = Math.abs(data.x) > 0.5 || Math.abs(data.y) > 0.5;
  const backgroundColor = isTilted ? 'red' : 'white';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>X: {data.x.toFixed(2)}</Text>
      <Text style={styles.text}>Y: {data.y.toFixed(2)}</Text>
      <Text style={styles.text}>Z: {data.z.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});