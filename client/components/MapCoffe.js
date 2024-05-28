import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image, ScrollView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { Button, List } from 'react-native-paper';
import coffeeIcon from '../image/coffee-shop-logo.png';
import mapStyle from './MapStyle'
const GOOGLE_MAPS_API_KEY = 'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'; // Replace with your Google Maps API Key
Geocoder.init('AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o');

export default function MapCoffee() {
  const [region, setRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCoffeeShop, setSelectedCoffeeShop] = useState(null);
  const [directions, setDirections] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
      const coffeeShopsData = await Promise.all(
        data.results.map(async result => {
          const details = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&fields=name,rating,reviews,photos&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`
          );
          const detailsData = await details.json();
          return {
            name: result.name,
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
            photoReference: result.photos ? result.photos[0].photo_reference : null,
            distance: calculateDistance(latitude, longitude, result.geometry.location.lat, result.geometry.location.lng),
            reviews: detailsData.result.reviews || []
          };
        })
      );
      setSearchResults(coffeeShopsData);
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
    if (!searchQuery.trim()) {
      setSearchResults([]); // Clear results if search query is empty
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&location=${region.latitude},${region.longitude}&radius=5000&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`
      );
      const data = await response.json();
      const placesData = await Promise.all(
        data.results.map(async result => {
          const details = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&fields=name,rating,reviews,photos,geometry&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`
          );
          const detailsData = await details.json();
          return {
            name: result.name,
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
            photoReference: result.photos ? result.photos[0].photo_reference : null,
            distance: calculateDistance(region.latitude, region.longitude, result.geometry.location.lat, result.geometry.location.lng),
            reviews: detailsData.result.reviews || []
          };
        })
      );
      setSearchResults(placesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetDirections = async (place) => {
    try {
      const userLocation = `${region.latitude},${region.longitude}`;
      const destination = `${place.latitude},${place.longitude}`;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation}&destination=${destination}&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`
      );
      const data = await response.json();
      setDirections(data);
      setSelectedCoffeeShop(place);
      setModalVisible(true); // Show the modal with place details
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
          placeholder="Search places or coffee shops..."
        />
        <Button style={styles.button} textColor='white' onPress={handleSearch}>
          Search
        </Button>
      </View>

      {region ? (
        <MapView style={styles.map} initialRegion={region} customMapStyle={mapStyle}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          {Array.isArray(searchResults) && searchResults.map((marker, index) => (
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
        title="Search Results"
        style={styles.coffeeShopsList}
        left={props => <List.Icon {...props} icon="coffee" />}
      >
        <ScrollView style={styles.coffeeShopsContainer}>
          {Array.isArray(searchResults) && searchResults.map((coffeeShop, index) => (
            <TouchableOpacity key={index} onPress={() => handleGetDirections(coffeeShop)}>
              <View style={styles.coffeeShopItem}>
                <View style={styles.coffeeShopInfo}>
                  {coffeeShop.photoReference && (
                    <Image
                      style={styles.coffeeShopImage}
                      source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${coffeeShop.photoReference}&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`
                      }}
                    />
                  )}
                  <Text style={styles.coffeeShopName}>{coffeeShop.name}</Text>
                  <Text style={styles.distanceText}>
                    <Text style={styles.distanceValue}>{coffeeShop.distance} km</Text>
                  </Text>
                </View>
                <View style={styles.reviewsContainer}>
                  {coffeeShop.reviews.map((review, reviewIndex) => (
                    <View key={reviewIndex} style={styles.reviewItem}>
                      <Text style={styles.reviewAuthor}>{review.author_name}</Text>
                      <Text style={styles.reviewText}>{review.text}</Text>
                      <Text style={styles.reviewRating}>Rating: {review.rating}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </List.Accordion>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{selectedCoffeeShop?.name}</Text>
          {selectedCoffeeShop?.photoReference && (
            <Image
              style={styles.modalImage}
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${selectedCoffeeShop.photoReference}&key=${'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}`
              }}
            />
          )}
          
          <ScrollView style={styles.modalReviewsContainer}>
            {selectedCoffeeShop?.reviews.map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <Text style={styles.reviewAuthor}>{review.author_name}</Text>
                <Text style={styles.reviewText}>{review.text}</Text>
                <Text style={styles.reviewRating}>Rating: {review.rating}</Text>
              </View>
            ))}
          </ScrollView>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </Modal>
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
    padding :  10 , 
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    fontSize: 16,
  },
  coffeeShopsList: {
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
  coffeeShopsContainer: {
    padding: 10,
    marginLeft: -30,
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
  reviewsContainer: {
    padding: 10,
  },
  reviewItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  reviewAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  reviewText: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 5,
  },
  reviewRating: {
    fontWeight: 'bold',
    color: '#dba617',
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    alignSelf: 'center',
  },
  modalReviewsContainer: {
    flex: 1,
  },
  buttonClose: {
    backgroundColor: '#dba617',
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});