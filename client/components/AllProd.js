import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TextInput, ToastAndroid } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import { ipAdress } from '../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AllProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

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
        const productsResponse = await axios.get(`http://${ipAdress}:3000/api/product/`);
        const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/review`);

        const productsWithReviews = productsResponse.data.map(product => {
          const productReviews = reviewsResponse.data.filter(review => review.prodId === product.id);
          const totalReviews = productReviews.length;
          const averageRating = totalReviews ? productReviews.reduce((acc, review) => acc + review.stars, 0) / totalReviews : 0;
          return {
            ...product,
            totalReviews,
            averageRating: averageRating.toFixed(1),
          };
        });

        setProducts(productsWithReviews);
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
  
        // Displaying a toast message at the top
        ToastAndroid.showWithGravity('Item added to cart', ToastAndroid.TOP, ToastAndroid.TOP);
      }
    } catch (error) {
      console.log('Error toggling feature:', error);
    }
  };
  const handleAddToFavorites = async (product) => {
    try {
      // Validate product
      if (!product || !product.id) {
        throw new Error('Invalid product data');
      }
  
      // Get existing favorites or initialize an empty array
      const existingFavorites = await AsyncStorage.getItem('favv');
      let favoritesArray = existingFavorites ? JSON.parse(existingFavorites) : [];
  
      // Check for duplicate
      const isDuplicate = favoritesArray.some((fav) => fav.id === product.id);
      if (isDuplicate) {
        throw new Error('Product already exists in favorites');
      }
  
      // Add the product to favorites (immutable update)
      favoritesArray = [...favoritesArray, product];
  
      // Save the updated favorites back to AsyncStorage
      await AsyncStorage.setItem('favv', JSON.stringify(favoritesArray));
  
      // Display toast message
      ToastAndroid.showWithGravity('Item added to favorites', ToastAndroid.TOP, ToastAndroid.TOP);
    } catch (error) {
      console.error('Error storing favorite:', error.message);
      // Optionally, show a toast message for the error
      ToastAndroid.showWithGravity('Failed to add item to favorites', ToastAndroid.TOP, ToastAndroid.TOP);
    }
  };
  const goToHomePage = () => {
    navigation.navigate('homePage');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goToHomePage}>
          <Image
            source={require('../image/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search products..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <ScrollView>
        {error ? (
          <Text>Error: {error}</Text>
        ) : (
          <View style={styles.productsContainer}>
            {filteredProducts.map((product) => (
              <View style={styles.card} key={product.id}>
                <TouchableOpacity onPress={() => handleNavigateToDetails(product)}>
                  <Image source={{ uri: product.imgUrl }} style={styles.image} />
                </TouchableOpacity>
                <Icon
                  name={'heart-outline'}
                  size={27}
                  style={styles.favIcon}
                  onPress={() => handleAddToFavorites(product)} // Pass the product to handleAddToFavorites
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.reviews}>{`${product.totalReviews} 👤 ⭐: ${product.averageRating}`}</Text>
                  <Text style={styles.name}>{product.name}</Text>
                  <Text style={styles.price}>${product.price}</Text>
                  <Icon
                    name={favorites[product.id]?.inCart ? 'cart' : 'cart-outline'}
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
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 120,
    height: 120,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderColor: '#dba617',
    borderWidth: 2,
    margin: 20,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    color: '#424242',
    fontSize: 18,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  card: {
    width: '48%',
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  favIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  infoContainer: {
    padding: 12,
    width: '100%',
    position: 'relative',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  reviews: {
    fontSize: 14,
    color: '#999',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cartIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#dba617',
    padding: 5,
    borderRadius: 15,
  },
});

export default AllProducts;
