import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'; // Replace with your actual API key
Geocoder.init("AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o");

export default function App() {
  const [region, setRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [coffeeShopMarkers, setCoffeeShopMarkers] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const handleSearch = async () => {
    try {
      const response = await Geocoder.from(searchQuery);
      const { lat, lng } = response.results[0].geometry.location;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const searchCoffeeShops = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=5000&type=cafe&keyword=coffee&key=${"AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o"}`
      );
      const data = await response.json();
      const coffeeShops = data.results.map(result => ({
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        name: result.name,
        imageUrl: result.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${"AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o"}` : undefined
      }));
      
      setCoffeeShopMarkers(coffeeShops);
    } catch (error) {
      console.error(error);
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
        <Button title="Search" onPress={handleSearch} />
        <Button title="Search Coffee Shops" onPress={searchCoffeeShops} />
      </View>
      {region ? (
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          {coffeeShopMarkers.map((marker, index) => (
            <Marker key={index} coordinate={marker} pinColor="blue">
              <MapView.Callout>
                <View>
                  <Text>{marker.name}</Text>
                  {marker.imageUrl && <Image source={{ uri: marker.imageUrl }} style={{ width: 100, height: 100 }} />}
                </View>
              </MapView.Callout>
            </Marker>
          ))}
        </MapView>
      ) : (
        <MapView style={styles.map} />
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
});