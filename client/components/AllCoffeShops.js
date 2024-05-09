import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ipAdress } from '../config';
import FlatListPopularShops from './FlatListPopularShops';
const CoffeeShopsList = () => {
  const [coffeeShopsData, setCoffeeShopsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Define dummy data within the scope of the component
  const dummyData = [
    {
      id: 1,
      FirstName: "John",
      LastName: "Doe",
      Address: "123 Main St",
      Email: "john@example.com",
      Password: "password123",
      ImageUrl: "https://example.com/images/john.jpg",
      UserType: "coffee",
      createdAt: "2024-05-07T14:25:42.000Z",
      updatedAt: "2024-05-07T14:25:42.000Z"
    },
    {
      id: 2,
      FirstName: "Jane",
      LastName: "Smith",
      Address: "456 Elm St",
      Email: "jane@example.com",
      Password: "password456",
      ImageUrl: "https://example.com/images/jane.jpg",
      UserType: "coffee",
      createdAt: "2024-05-07T14:25:42.000Z",
      updatedAt: "2024-05-07T14:25:42.000Z"
    },
    // Add more dummy data as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Instead of fetching from an API, use the dummy data for testing
        // const response = await axios.get(`http://${ipAdress}:3000/api/auth/all`);
        // Filter the coffee shops data on the client-side by UserType "coffee"
        const filteredData = dummyData.filter(user => user.UserType === "coffee");
        setCoffeeShopsData(filteredData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const filteredCoffeeShops = coffeeShopsData.filter(coffeeShop =>
    coffeeShop.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coffeeShop.LastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Shop</Text>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
          />
      </View>
          <FlatListPopularShops/>
      <Text style={styles.TxtList}>List Coffee Shops ({filteredCoffeeShops.length})</Text>
      <FlatList
        data={filteredCoffeeShops}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              style={styles.image}
              source={{ uri: item.ImageUrl }}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.FirstName} {item.LastName}</Text>
              <Text style={styles.address}>{item.Address}</Text>
              {/* Add your rating and reviews here if available */}
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
  TxtList: {
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
  favoriteButton: {
    padding: 10,
  },
});

export default CoffeeShopsList;
