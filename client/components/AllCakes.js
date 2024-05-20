import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { ipAdress } from '../config';

const AllCakes = ({ navigation }) => {
  const [cakes, setCakes] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const productsResponse = await axios.get(`http://${ipAdress}:3000/api/product/SearchByCategory/cake`);
        const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/review`);

        const cakesWithReviews = productsResponse.data.map(cake => {
          const cakeReviews = reviewsResponse.data.filter(review => review.prodId === cake.id);
          const totalReviews = cakeReviews.length;
          const averageRating = totalReviews ? cakeReviews.reduce((acc, review) => acc + review.stars, 0) / totalReviews : 0;
          return {
            ...cake,
            totalReviews,
            averageRating: averageRating.toFixed(1),
          };
        });

        setCakes(cakesWithReviews);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCakes();
  }, []);

  const toggleFeature = async (id, feature) => {
    try {
      const isFavorited = favorites[id]?.[feature];
      const cake = cakes.find((cake) => cake.id === id);
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
        favoritesArray.push(cake);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

        // Displaying a toast message at the top
        ToastAndroid.showWithGravity('Item added to cart', ToastAndroid.SHORT, ToastAndroid.TOP);
      }
    } catch (error) {
      console.log('Error toggling feature:', error);
    }
  };

  const handleNavigateToDetails = async (cake) => {
    try {
      await AsyncStorage.setItem('selectedProductId', cake.id.toString());
      navigation.navigate('prd', { product: cake });
    } catch (error) {
      console.log('Error storing selected product ID:', error);
    }
  };

  const filteredCakes = cakes.filter(cake =>
    cake.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(219, 166, 23, 1)', 'rgba(219, 166, 23, 1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Cakes 🍰</Text>
      </LinearGradient>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search cakes..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <ScrollView>
        {error ? (
          <Text>Error: {error}</Text>
        ) : (
          <View style={styles.productsContainer}>
            {filteredCakes.map((cake, index) => {
              const isLastOddCard = filteredCakes.length % 2 !== 0 && index === filteredCakes.length - 1;
              return (
                <View style={[styles.card, isLastOddCard && styles.lastOddCard]} key={cake.id}>
                  <TouchableOpacity onPress={() => handleNavigateToDetails(cake)}>
                    <Image source={{ uri: cake.imgUrl }} style={styles.image} />
                  </TouchableOpacity>
                  <Icon
                    name={favorites[cake.id]?.favored ? 'heart' : 'heart-outline'}
                    color={favorites[cake.id]?.favored ? 'red' : '#dba617'}
                    size={27}
                    style={styles.favIcon}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.reviews}>{`${cake.totalReviews} 👤 ⭐: ${cake.averageRating}`}</Text>
                    <Text style={styles.name}>{cake.name}</Text>
                    <Text style={styles.price}>${cake.price}</Text>
                    <Icon
                      name={favorites[cake.id]?.inCart ? 'cart' : 'cart-outline'}
                      size={24}
                      onPress={() => toggleFeature(cake.id, 'inCart')}
                      style={styles.cartIcon}
                    />
                  </View>
                </View>
              );
            })}
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
    backgroundColor: '#fff',
  },
  gradientBackground: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    marginHorizontal: 0,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    color: '#fff',
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
  lastOddCard: {
    width: '98%',
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

export default AllCakes;
