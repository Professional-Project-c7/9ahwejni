import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TextInput, Button, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'; // Replace with your actual API key
Geocoder.init('AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o');

export default function MapCoffe() {
  const [region, setRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [renderAll, setRenderAll] = useState(false);

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
      searchCoffeeShops(lat, lng);
    } catch (error) {
      console.error(error);
    }
  };

  const searchCoffeeShops = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=cafe&keyword=coffee&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`
      );
      const data = await response.json();

      // Extract coffee shop locations, names, and photos from response
      const coffeeShopsData = data.results.map(result => ({
        name: result.name,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        photoReference: result.photos ? result.photos[0].photo_reference : null // Get the photo reference if available
      }));

      // Set coffee shop markers and details
      setCoffeeShops(coffeeShopsData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCoffeeShops = () => {
    if (renderAll) {
      return coffeeShops;
    } else {
      // Render only a limited number of coffee shops
      const limitedCoffeeShops = coffeeShops.slice(0, 5); // Change the number as needed
      return limitedCoffeeShops;
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
      </View>
      {region ? (
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          {renderCoffeeShops().map((marker, index) => (
            <Marker key={index} coordinate={marker} pinColor="blue" />
          ))}
        </MapView>
      ) : (
        <MapView style={styles.map} />
      )}
      {coffeeShops.length > 0 && ( // Render the button only if coffee shops are available
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
              </View>
              <Text style={[styles.coffeeShopName, renderAll && styles.enlargedCoffeeShopName]}>{coffeeShop.name}</Text>
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
  },
  showAllButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#B5C18E',

    marginLeft: 310
  },

  coffeeShopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coffeeShopName: {
    fontSize: 18,
    fontWeight: 'bold',
  
  },
  coffeeShopImage: {
    width: 85,
    height: 85,
    borderRadius: 5,
  },
  enlargedCoffeeShopImage: {
    width: 400,
    height: 200,
    borderRadius: 5,
  },
  enlargedCoffeeShopName: {
  textAlign: 'center',
  },
  
  
});
