// Includes all the styles for the components

import { StyleSheet, Platform, StatusBar } from 'react-native';


export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Fixes StatusBar overlap issue on Android
    backgroundColor: '#f5f5f5', // Set background color
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',    
  },
  weather: {
    flex: 2,
    padding: 16,
    backgroundColor: 'lightblue',
    gap: 25,
  },
  Footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 2,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'column',
    gap: 20,
  },
  headerItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,

  },
  city_title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  info_title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  searchText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  temperature: {
    fontSize: 18,
    alignSelf: 'center',
  },
  windSpeed: {
    fontSize: 18,
    alignSelf: 'center',
  },

});
