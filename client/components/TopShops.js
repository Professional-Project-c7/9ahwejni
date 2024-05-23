import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { ipAdress } from '../config';
import { useNavigation } from '@react-navigation/native';

const TopShops = ({ navigation }) => {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/user/`);
        const filteredShops = response.data.filter(user => user.UserType === "coffee");

        // Fetch reviews for each shop
        const shopsWithReviewsPromises = filteredShops.map(async shop => {
          const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/reviewz/reviewee/${shop.id}`);
          const reviews = reviewsResponse.data;
          const totalReviews = reviews.length;
          const averageRating = totalReviews ? (reviews.reduce((acc, review) => acc + review.stars, 0) / totalReviews).toFixed(1) : 0;
          return { ...shop, totalReviews, averageRating };
        });

        const shopsWithReviews = await Promise.all(shopsWithReviewsPromises);
        const topRatedShops = shopsWithReviews.sort((a, b) => b.averageRating - a.averageRating).slice(0, 6);
        setCoffeeShops(topRatedShops);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCoffeeShops();
  }, []);

  const handleNavigateToProductList = (coffeeShopId, shopName, shopImageUrl) => {
    navigation.navigate('ProductList', { coffeeShopId, shopName, shopImageUrl });
  };

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={coffeeShops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleNavigateToProductList(item.id, `${item.FirstName} ${item.LastName}`, item.ImageUrl)}
          >
            <Image source={{ uri: item.ImageUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.FirstName} {item.LastName}</Text>
              <Text style={styles.address}>{item.Address}</Text>
              <Text style={styles.ratingText}>{`⭐ ${item.averageRating} (${item.totalReviews} 👤)`}</Text>
            </View>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fdfdfd',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    width: 220,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
  },
  info: {
    padding: 15,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    fontStyle: 'italic',

  },
  address: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    fontStyle: 'italic',

  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',

  },
});

export default TopShops;
