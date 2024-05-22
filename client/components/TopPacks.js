import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { ipAdress } from '../config';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopPacks = ({ navigation }) => {
  const [packs, setPacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const packsResponse = await axios.get(`http://${ipAdress}:3000/api/packs`);
        const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/packreview`);
        
        console.log("Packs response:", packsResponse.data);
        console.log("Reviews response:", reviewsResponse.data);

        const packsWithReviews = packsResponse.data.map(pack => {
          const packReviews = reviewsResponse.data.filter(review => review.PackId === pack.id);
          const totalReviews = packReviews.length;
          const averageRating = totalReviews ? packReviews.reduce((acc, review) => acc + review.stars, 0) / totalReviews : 0;
          return {
            ...pack,
            totalReviews,
            averageRating: averageRating.toFixed(1),
          };
        });

        const topRatedPacks = packsWithReviews.sort((a, b) => b.averageRating - a.averageRating).slice(0, 6);
        setPacks(topRatedPacks);
        console.log("Top rated packs:", topRatedPacks);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching packs or reviews:", err);
      }
    };

    fetchPacks();
  }, []);

  const handleNavigateToDetails = async (pack) => {
    try {
      await AsyncStorage.setItem('selectedProductId', pack.id.toString());
      navigation.navigate('prd', { product: pack });
    } catch (error) {
      console.log('Error storing selected product ID:', error);
    }
  };

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hottest Packs Of The Day</Text>
      <FlatList
        data={packs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleNavigateToDetails(item)}
          >
            <Image source={{ uri: item.imgUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.reviews}>{`${item.totalReviews} 👤 ⭐: ${item.averageRating}`}</Text>
              <Text style={styles.price}>${item.price}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dba617',
    marginBottom: 10,
    marginLeft: 10,
    fontStyle: 'italic',

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
    marginVertical: 5,
    width: 220,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    fontStyle: 'italic',

  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontStyle: 'italic',

  },
  reviews: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',

  },
});

export default TopPacks;
