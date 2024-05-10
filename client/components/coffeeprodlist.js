import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';
import { Checkbox } from 'react-native-paper';

const CoffeeProductList = () => {
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState(null);
  const [checkedItems, setCheckedItems] = useState({}); // Store checked state for each product

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        if (value !== null) {
          const tokenObject = JSON.parse(value);
          const userId = tokenObject.userId; 
          setUserID(userId);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    retrieveData();
  }, []);

  useEffect(() => {
    const getUserData = async (userId) => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/product`);
        if (response.status === 200) {
          setUserData(response.data);
          // Initialize checked state for each product
          const initialCheckedState = response.data.reduce((acc, curr) => {
            acc[curr.id] = false;
            return acc;
          }, {});
          setCheckedItems(initialCheckedState);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (userID) {
      getUserData(userID);
    }
  }, [userID]);

  const handleCheckboxToggle = (productId) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [productId]: !prevState[productId] // Toggle the checked state for the specific product
    }));
  };

  // Filter the products based on the userID
  const filteredProducts = userData ? userData.filter(product => product.userId === userID) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Image source={{ uri: item.imgUrl }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
              <Checkbox
                status={checkedItems[item.id] ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxToggle(item.id)}
                style={styles.checkbox}
              />
            </View>
          )}
        />
      ) : (
        <Text>No products found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default CoffeeProductList;
