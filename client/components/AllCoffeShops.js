import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import FlatListPopularShops from './FlatListPopularShops';
import { ipAdress } from '../config';
import { useNavigation } from '@react-navigation/native';

const CoffeeShopsList = ({ navigation }) => {
  const [coffeeShopsData, setCoffeeShopsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/user`);
        const filteredShops = response.data.filter(user => user.UserType === 'coffee');

        // Fetch reviews for each shop
        const shopsWithReviewsPromises = filteredShops.map(async shop => {
          const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/reviewz/reviewee/${shop.id}`);
          const reviews = reviewsResponse.data;
          const totalReviews = reviews.length;
          const averageRating = totalReviews ? (reviews.reduce((acc, review) => acc + review.stars, 0) / totalReviews).toFixed(1) : 0;
          return { ...shop, totalReviews, averageRating };
        });

        const shopsWithReviews = await Promise.all(shopsWithReviewsPromises);
        setCoffeeShopsData(shopsWithReviews);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchData();
  }, []);

  const filteredCoffeeShops = coffeeShopsData.filter(coffeeShop =>
    coffeeShop.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coffeeShop.LastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to the ProductList screen
  const handleNavigateToProductList = (coffeeShopId) => {
    navigation.navigate('ProductList', { coffeeShopId });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(219, 166, 23, 1)', 'rgba(219, 166, 23, 1)']}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Coffee Shops</Text>
      </LinearGradient>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <FlatListPopularShops />
      <Text style={styles.TxtList}>List of our shops ({filteredCoffeeShops.length})</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={filteredCoffeeShops}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleNavigateToProductList(item.id)}
          >
            <Image
              style={styles.image}
              source={{ uri: item.ImageUrl }}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.FirstName} {item.LastName}</Text>
              <Text style={styles.address}>{item.Address}</Text>
              <Text style={styles.ratingText}>{`⭐ ${item.averageRating} (${item.totalReviews} reviews)`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientBackground: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    marginHorizontal: 0,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.92,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    flexWrap: 'wrap',
  },
  address: {
    fontSize: 18,
    color: '#111',
  },
  ratingText: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CoffeeShopsList;
