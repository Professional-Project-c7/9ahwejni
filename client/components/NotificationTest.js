import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const ipAdress = 'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'; // Replace with your server's IP address

export default function MapCoffee() {
  const [region, setRegion] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState([]);

  useEffect(() => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        fetchCoffeeShops();
      },
      error => {
        console.log(error.message);
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to use this feature.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const fetchCoffeeShops = async () => {
    try {
      const response = await fetch(`http://${ipAdress}:3000/api/auth/all`);
      const data = await response.json();

      const coffeeShopsWithAddress = data.map(coffeeShop => ({
        ...coffeeShop,
        latitude: parseFloat(coffeeShop.Adress.split(',')[0]), // Extract latitude from address
        longitude: parseFloat(coffeeShop.Adress.split(',')[1]), // Extract longitude from address
      }));

      setCoffeeShops(coffeeShopsWithAddress);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'An error occurred while fetching coffee shop locations. Please try again later.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView style={styles.map} region={region}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          {coffeeShops.map((coffeeShop, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: coffeeShop.latitude, longitude: coffeeShop.longitude }}
              pinColor="blue"
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
