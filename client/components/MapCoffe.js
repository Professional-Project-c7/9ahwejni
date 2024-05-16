import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { Button, List } from 'react-native-paper';
import coffeeIcon from '../image/coffee-shop-logo.png';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'; // Replace with your Google Maps API Key
Geocoder.init('AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o');

export default function MapCoffee() {
  const [region, setRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [selectedCoffeeShop, setSelectedCoffeeShop] = useState(null);
  const [directions, setDirections] = useState(null);

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
        searchCoffeeShops(latitude, longitude);
      },
      error => {
        console.error(error.message);
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to use this feature.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const searchCoffeeShops = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=cafe&keyword=coffee&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`
      );
      const data = await response.json();
      const coffeeShopsData = data.results.map(result => ({
        name: result.name,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        photoReference: result.photos ? result.photos[0].photo_reference : null,
        distance: calculateDistance(latitude, longitude, result.geometry.location.lat, result.geometry.location.lng)
      }));
      setCoffeeShops(coffeeShopsData);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(2);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleSearch = async () => {
    try {
      const response = await Geocoder.from(searchQuery);
      if (response.results.length === 0) {
        Alert.alert(
          'Location Not Found',
          'No results found for the provided search query. Please try entering a different location name or address.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        return;
      }
      const { lat, lng } = response.results[0].geometry.location;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      searchCoffeeShops(lat, lng);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'An error occurred while searching for the location. Please try again later.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  const handleGetDirections = async (coffeeShop) => {
    try {
      const userLocation = `${region.latitude},${region.longitude}`;
      const destination = `${coffeeShop.latitude},${coffeeShop.longitude}`;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation}&destination=${destination}&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`
      );
      const data = await response.json();
      setDirections(data);
      setSelectedCoffeeShop(coffeeShop);
    } catch (error) {
      console.error('Error fetching directions:', error);
      Alert.alert(
        'Error',
        'An error occurred while fetching directions. Please try again later.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  const decodePolyline = (encoded) => {
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;
    const coordinates = [];

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      coordinates.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return coordinates;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholder="Search location..."
        />
        <Button style={styles.button} textColor='white' onPress={handleSearch}>
          Search
        </Button>
      </View>

      {region ? (
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          {coffeeShops.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              onPress={() => handleGetDirections(marker)}
            >
              <Image
                source={coffeeIcon}
                style={{ width: 20, height: 35 }}
              />
            </Marker>
          ))}
          {directions && directions.routes && directions.routes.length > 0 && directions.routes[0].overview_polyline && (
            <Polyline
              coordinates={decodePolyline(directions.routes[0].overview_polyline.points)}
              strokeWidth={5}
              strokeColor="blue"
            />
          )}
        </MapView>
      ) : (
        <MapView style={styles.map} />
      )}

      <List.Accordion
        title="Coffee Shops"
        style={styles.coffeeShopsList}
        left={props => <List.Icon {...props} icon="coffee" color='white' />}
      >
        <ScrollView style={styles.coffeeShopsContainer}>
          {coffeeShops.map((coffeeShop, index) => (
            <TouchableOpacity key={index} onPress={() => handleGetDirections(coffeeShop)}>
              <View style={styles.coffeeShopItem}>
                <View style={styles.coffeeShopInfo}>
                  {coffeeShop.photoReference && (
                    <Image
                      source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${coffeeShop.photoReference}&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`,
                      }}
                      style={styles.coffeeShopImage}
                    />
                  )}
                  <Text style={styles.coffeeShopName}>{coffeeShop.name}</Text>
                </View>
                <View style={styles.distanceContainer}>
                  <Text style={styles.distanceText}>
                    <Text style={styles.distanceValue}>{coffeeShop.distance} km</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </List.Accordion>
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
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  button: {
    backgroundColor: '#dba617',
    padding :4,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#dba617',
    borderRadius: 15,
    fontSize: 16,
  },
  coffeeShopsList: {
    marginBottom: 10,
    backgroundColor: '#dba617',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  coffeeShopsContainer: {
    paddingLeft : -10,

    padding: 10,
  },
  coffeeShopItem: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  coffeeShopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  coffeeShopName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
  },
  coffeeShopImage: {
    width: 85,
    height: 85,
    borderRadius: 5,
  },
  distanceContainer: {
    marginLeft: 20,
  },
  distanceText: {
    fontSize: 16,
  },
  distanceValue: {
    fontWeight: 'bold',
  },
});