import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';
import { Checkbox } from 'react-native-paper';
import { IconButton } from 'react-native-paper';

const NumberInput = ({ value, onIncrement, onDecrement }) => {
  return (
    <View style={styles.numberInput}>
      <TouchableOpacity onPress={onDecrement}>
        <IconButton icon="minus-circle" iconColor="#dba617" />
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity onPress={onIncrement}>
        <IconButton icon="plus-circle" iconColor="#dba617" />
      </TouchableOpacity>
    </View>
  );
};

const CoffeeProductList = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [productQuantities, setProductQuantities] = useState({}); 
  const [checkedProductIDs, setCheckedProductIDs] = useState([]); 
console.log("checkedProductIDs" ,checkedProductIDs);
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('IdUser');
        if (value !== null) {
          const tokenObject = JSON.parse(value);
          const userId = tokenObject;
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
          // Initialize product quantities for each product to 0
          const initialQuantitiesState = response.data.reduce((acc, curr) => {
            acc[curr.id] = '0'; // Start with quantity 0
            return acc;
          }, {});
          setProductQuantities(initialQuantitiesState);
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
    setCheckedItems((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId], // Toggle the checked state for the specific product
    }));
  
    // Update the array of checked product IDs
    setCheckedProductIDs((prevState) => {
      if (prevState.includes(productId)) {
        return prevState.filter((id) => id !== productId); // Remove ID if already exists
      } else {
        return [...prevState, productId]; // Add ID if not already present
      }
    });
  };
  
  
  const handleQuantityIncrement = (productId) => {
    const newValue = parseInt(productQuantities[productId]) + 1;
    setProductQuantities(prevState => ({
      ...prevState,
      [productId]: newValue.toString()
    }));
  };

  const handleQuantityDecrement = (productId) => {
    const newValue = parseInt(productQuantities[productId]) - 1;
    if (newValue >= 0) {
      setProductQuantities(prevState => ({
        ...prevState,
        [productId]: newValue.toString()
      }));
    }
  };

  const setArrayOfProductsIds = async () => {
    try {
      await  AsyncStorage.setItem('ArrayOfProductsIds', JSON.stringify(checkedProductIDs));
    } catch (error) {
      console.error('Error Stored array:', error);
    }
  };

  const handlesetArray = () => {
    const productsToAdd = [];
    // Iterate over productQuantities object
    for (const productId in productQuantities) {
      // Convert quantity to a number
      const quantity = parseInt(productQuantities[productId]);
      // If quantity is greater than 0, add the product ID the corresponding number of times
      if (quantity > 0) {
        for (let i = 0; i < quantity; i++) {
          productsToAdd.push(productId);
        }
      }
    }
    // Pass the array of product IDs as a parameter when navigating to AddPacks
    navigation.navigate('AddPacks', { productIds: checkedProductIDs });
  // console.log(productIds);

  };
  


  const filteredProducts = userData ? userData.filter(product => product.userId === userID) : [];
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <View style={styles.product}>
                <Image source={{ uri: item.imgUrl }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDescription}>{item.description}</Text>
                  <Text style={styles.productPrice}>{item.price} $</Text>
                </View>
                <NumberInput
                value={parseInt(productQuantities[item.id])}
                  onIncrement={() => handleQuantityIncrement(item.id)}
                  onDecrement={() => handleQuantityDecrement(item.id)}
                />
                <Checkbox
                  status={checkedItems[item.id] ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxToggle(item.id)}
                  style={styles.checkbox}
                />
             
            </View>
            
            </View>
          )}
        />
      ) : (
        <Text>No products found</Text>
      )}
      <TouchableOpacity style={styles.centered} onPress={handlesetArray}>
        <View style={styles.saveButton}>
    <IconButton icon="content-save" iconColor="white"  />
          <Text style={styles.saveButtonText}>Save</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#dba617',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: -15,
    paddingHorizontal: 5, // Reduce horizontal padding
    paddingVertical: 2, // Reduce vertical padding
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    width: 100, // Set a smaller width
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
    marginLeft: -5,
  },
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
    borderColor: '#dba617',
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
  numberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dba617',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: '#dba617',
    marginHorizontal: 10,
  },
  value: {
    fontSize: 18,
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default CoffeeProductList;
