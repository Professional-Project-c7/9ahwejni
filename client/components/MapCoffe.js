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
      }));

      setCoffeeShops(coffeeShopsData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCoffeeShops = () => {
    if (searchQuery === '') {
      return coffeeShops; // Render all coffee shops if no search query
    } else {
      if (renderAll) {
        return coffeeShops;
      } else {
        // Render only a limited number of coffee shops
        const limitedCoffeeShops = coffeeShops.slice(0, 5); // Change the number as needed
        return limitedCoffeeShops;
      }
    }
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
      
      // Add marker for searched location
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
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholder="Search location..."
        />
          <Button  style={styles.button} onPress={handleSearch}>
   Search
  </Button>
      </View>
      {region ? (
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          {renderCoffeeShops().map((marker, index) => (
            <Marker key={index} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} pinColor="blue" />
          ))}
        </MapView>
      ) : (
        <MapView style={styles.map} />
      )}
      {coffeeShops.length > 0 && (
        <ScrollView style={styles.coffeeShopsContainer}>
          <TouchableOpacity onPress={() => setRenderAll(!renderAll)} style={styles.showAllButton}>
            <Text style={styles.showAllButtonText}>{renderAll ? 'Show Less' : 'Show All'}</Text>
          </TouchableOpacity>
          {renderCoffeeShops().map((coffeeShop, index) => (
            <View key={index} style={styles.coffeeShopItem}>
              <View style={styles.coffeeShopInfo}>
                {coffeeShop.photoReference && (
                  <Image
                    source={{
                      uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${coffeeShop.photoReference}&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`,
                    }}
                    style={renderAll ? styles.enlargedCoffeeShopImage : styles.coffeeShopImage}
                  />
                )}
                <Text style={[styles.coffeeShopName, renderAll && styles.enlargedCoffeeShopName]}>{coffeeShop.name}</Text>
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
  button:{
    backgroundColor: '#dba617',
  
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
    backgroundColor: '#fff', /* Background color similar to paper */
    borderRadius: 10, /* Rounded corners */
    shadowColor: '#000', /* Shadow color */
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, /* Opacity of the shadow */
    shadowRadius: 3.84,
    elevation: 5, /* Elevation for Android */
  },
  coffeeShopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10, /* Add padding for spacing */
  },
  coffeeShopName: {
    flex: 1, /* Ensure the name takes remaining space */
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
    flex: 1, /* Ensure the name takes remaining space */
    textAlign: 'center',
    marginLeft: 40
  },
});
