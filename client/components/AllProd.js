import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TextInput, Alert } from 'react-native';
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
        Alert.alert('Item added to cart');
      }
    } catch (error) {
      console.log('Error toggling feature:', error);
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
                  name={favorites[product.id]?.favored ? 'heart' : 'heart-outline'}
                  color={favorites[product.id]?.favored ? 'red' : '#dba617'}
                  size={27}
                  style={styles.favIcon}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{product.name}</Text>
                  <Text style={styles.price}>${product.price}</Text>
                  <Text style={styles.reviews}>{`${product.totalReviews} 👤 ⭐: ${product.averageRating}`}</Text>
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={20}
                    startingValue={parseFloat(product.averageRating)}
                    readonly
                    style={styles.starRating}
                  />
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
    height: 60,
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
  favIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
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
    fontSize: 21,
    color: '#000',
    marginTop: 5,
  },
  reviews: {
    fontSize: 16,
    color: '#646464',
    marginTop: 5,
  },
  starRating: {
    marginTop: 5,
  },
  cartIcon: {
    position: 'absolute',
    right: 5,
    bottom: 1,
    backgroundColor: '#dba617',
    padding: 8,
    borderRadius: 15,
  },
});

export default AllProducts;
