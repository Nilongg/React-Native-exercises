import React, { useState, useEffect } from 'react';
import { Image, Text, View, TextInput } from 'react-native';
import { styles } from './styles';
import weatherIcons from './weatherIcons';

export default function Header({ weather, city, setCity, navigation }) {
  const [inputValue, setInputValue] = useState(''); // Separate state for input
  return (
    <View style={styles.header}>
      <View style={styles.headerItem}>
        <Text style={styles.searchText}>Search city</Text>
        <TextInput
          style={{ height: 50, borderColor: 'gray', borderWidth: 1, padding: 10 }}
          value={inputValue}
          onChangeText={setInputValue} // Update input state as user types
          onSubmitEditing={() => {
            setCity(inputValue); // Update city when user presses enter/done
          }}
        />
      </View>
      <View style={styles.headerItem}>
        <Text onPress={() => navigation.navigate('Details', { city: city, navigation: navigation })} style={styles.city_title}>{city}</Text>
        <Image source={{ uri: weatherIcons(weather) }} style={{ width: 75, height: 75, alignSelf: 'center' }} />
        <Text style={styles.info_title}>{weather}</Text>
      </View>
    </View>
  );
}
