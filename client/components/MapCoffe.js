import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { Button } from 'react-native-paper';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o';
Geocoder.init('AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o');

export default function MapCoffe() {
  const [region, setRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [renderAll, setRenderAll] = useState(false);
  const [selectedCoffeeShop, setSelectedCoffeeShop] = useState(null); // New state to store the selected coffee shop

  useEffect(() => {
    // Check for location permission
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

  // Function to calculate distance using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d.toFixed(2); // Round to 2 decimal places
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
          'No results found for the provided search query.',
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
      
      const searchedLocation = {
        latitude: lat,
        longitude: lng,
      };
      setCoffeeShops([searchedLocation, ...coffeeShops]);
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
      // Use the direction data to display the route on the map or do other actions as needed
      // You can extract information like distance, duration, and step-by-step instructions from the data
      // For simplicity, let's just log the direction data for now
      console.log('Directions:', data);
    } catch (error) {
      console.error('Error fetching directions:', error);
      Alert.alert(
        'Error',
        'An error occurred while fetching directions. Please try again later.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        {/* Search input */}
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholder="Search location..."
        />
        {/* Search button */}
        <Button style={styles.button} textColor='white' onPress={handleSearch}>
          Search
        </Button>
      </View>
      
      {/* Map */}
      {region ? (
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          {coffeeShops.map((marker, index) => (
            <Marker key={index} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} pinColor="blue" />
          ))}
        </MapView>
      ) : (
        <MapView style={styles.map} />
      )}

      {/* Coffee shops list */}
      {coffeeShops.length > 0 && (
        <ScrollView style={styles.coffeeShopsContainer}>
          {/* Show all button */}
          <TouchableOpacity onPress={() => setRenderAll(!renderAll)} style={styles.showAllButton}>
            <Text style={styles.showAllButtonText}>{renderAll ? 'Show Less' : 'Show All'}</Text>
          </TouchableOpacity>

          {/* Coffee shops cards */}
          {coffeeShops.map((coffeeShop, index) => (
            <View key={index} style={styles.coffeeShopItem}>
              <View style={styles.coffeeShopInfo}>
                {/* Coffee shop image */}
                {coffeeShop.photoReference && (
                  <Image
                    source={{
                      uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${coffeeShop.photoReference}&key=${GOOGLE_MAPS_API_KEY}`,
                    }}
                    style={renderAll ? styles.enlargedCoffeeShopImage : styles.coffeeShopImage}
                  />
                )}

                {/* Coffee shop name */}
                <Text style={[styles.coffeeShopName, renderAll && styles.enlargedCoffeeShopName]}>{coffeeShop.name}</Text>
                
                {/* Directions button */}
                <TouchableOpacity onPress={() => handleGetDirections(coffeeShop)}>
                  <Text style={styles.directionsButton}></Text>
                </TouchableOpacity>
              </View>

              {/* Distance */}
              <View style={styles.distanceContainer}>
                <Text style={styles.distanceText}>
                  Distance: <Text style={styles.distanceValue}>{coffeeShop.distance} km</Text>
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  button: {
    backgroundColor: '#dba617',
  },
  showAllButtonText : { 
    marginLeft : 300 ,
    fontWeight: 'bold', 
    fontSize : 20, 
   


  }, 
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
  },
  coffeeShopsContainer: {
    flex: 1,
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
  enlargedCoffeeShopImage: {
    width: 110,
    height: 110,
    borderRadius: 5,
  },
  enlargedCoffeeShopName: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 40
  },
  distanceContainer: {
    marginLeft: 20, // Adjust this value to your preference
  },
  distanceText: {
    fontSize: 16,
  },
  distanceValue: {
    fontWeight: 'bold',
  },
});