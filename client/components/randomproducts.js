import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { ipAdress } from '../config';

const RandomProducts = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [hearttt, sethearttt] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get(`http://${ipAdress}:3000/api/product`);
        const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/review`);

        // Mapping products to include review data
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

        // Sorting products by averageRating in descending order and taking top 4
        const topRatedProducts = productsWithReviews.sort((a, b) => b.averageRating - a.averageRating).slice(0, 4);

        setProducts(topRatedProducts);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  const playAlertSound = () => {
    const alertSound = new Sound('alert.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // Play the alert sound
      alertSound.play((success) => {
        if (success) {
          console.log('Alert sound played successfully');
        } else {
          console.log('Failed to play the alert sound');
        }
      });
    });
  };

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
        // playAlertSound();
  
        // setTimeout(() => {
        //   Alert.alert('');
        // }, 2000);
      }
    } catch (error) {
      console.log('Error toggling feature:', error);
    }
  };

  const handleNavigateToDetails = async (product) => {
    try {
      await AsyncStorage.setItem('selectedProductId', product.id.toString());
      navigation.navigate('prd', { product });
    } catch (error) {
      console.log('Error storing selected product ID:', error);
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
                <Icon
                  name={hearttt[product.id]?.favored ? 'heart' : 'heart-outline'}
                  color={hearttt[product.id]?.favored ? 'red' : '#dba617'}
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
                    onFinishRating={(rating) => console.log('New rating is: ', rating)}
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

export default RandomProducts;
