import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CoffeeShopsList = () => {
  const [coffeeShopsData, setCoffeeShopsData] = useState([]);

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.103.18:3000/api/cofee');
        setCoffeeShopsData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Shop</Text>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
        />
      </View>
      <FlatList
  data={coffeeShopsData}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.card}>
    <Image
      style={styles.image}
      source={{ uri: item.imgUrl }} 
    />
    <View style={styles.info}>
      <Text style={styles.name}>{item.FirstName} {item.LastName}</Text> 
      <Text style={styles.address}>{item.Adress}</Text> 
      <View style={styles.ratingSection}>
        <Text style={styles.ratingText}>{` ${item.rating} (${item.reviews} reviews)`}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.favoriteButton}>
      {/* You can add favorite functionality here */}
    </TouchableOpacity>
  </View>
  

  )}
/>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    margin: 20,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#424242',
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    color: '#555',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
  },
  favoriteButton: {
    padding: 10,
  },
  
});

export default CoffeeShopsList;
