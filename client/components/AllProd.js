import React, { useState, useEffect } from 'react';
import {TouchableOpacity ,  StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios'; // Import axios
import { ipAdress } from '../config';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AllProducts = () => {

  const navigation = useNavigation(); 

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Declare error state
  const [favorites, setFavorites] = useState({});
 
  
  const handleNavigateToDetails = async (product) => {
    try {
     
      await AsyncStorage.setItem('selectedProductId', product.id.toString());
      navigation.navigate('prd', { product });
    } catch (error) {
      console.log('Error storing selected product ID:', error);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/product/`);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);


  const toggleFeature = async (id, feature) => {
    try {
      const isFavorited = favorites[id]?.[feature];
      const product = products.find((product) => product.id === id);
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      if (!isFavorited) {
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [id]: {
            ...prevFavorites[id],
            [feature]: true,
          },
        }));
  
        favoritesArray.push(product);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  
        // Show alert and play sound
        Alert.alert('Item added to cart');
        playAlertSound();
  
        // Dismiss the alert after 2 seconds
        setTimeout(() => {
          Alert.alert('');
        }, 2000);
      }
    } catch (error) {
      console.log('Error toggling feature:', error);
    }
  };
  



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {error ? (
          <Text>Error: {error}</Text>
        ) : (
          <View style={styles.productsContainer}>
            {products.map((product) => (
              <View style={styles.card} key={product.id}>
                <TouchableOpacity onPress={() => handleNavigateToDetails(product)}>
                  <Image source={{ uri: product.imgUrl }} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{product.name}</Text> 
                  <Text style={styles.price}>${product.price}</Text>
                  <Icon
                    name={favorites[product.id]?.inCart ? 'cart' : 'cart'}
                    size={24}
                    onPress={() => toggleFeature(product.id, 'inCart')}
                    style={styles.cartIcon}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  card: {
    width: 189,
    margin: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1.5,
    marginTop: 12,
  },
  image: {
    height: 210,
    width: '100%',
    alignSelf: 'center',
  },
  infoContainer: {
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    position: 'relative',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 20,
    color: '#000',
    marginTop: 5,
  },
});

export default AllProducts;
