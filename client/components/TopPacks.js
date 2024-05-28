import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { ipAdress } from '../config';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductModal from '../components/PackComponents';

const TopPacks = ({ navigation }) => {
  const [packs, setPacks] = useState([]);
  const [error, setError] = useState(null);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const packsResponse = await axios.get(`http://${ipAdress}:3000/api/packs`);
        const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/packreview`);

        const packsWithReviews = packsResponse.data.map(pack => {
          const packReviews = reviewsResponse.data.filter(review => review.PackId === pack.id);
          const totalReviews = packReviews.length;
          const averageRating = totalReviews ? packReviews.reduce((acc, review) => acc + review.stars, 0) / totalReviews : 0;
          return {
            ...pack,
            totalReviews,
            averageRating: averageRating.toFixed(1),
            prods: pack.prods || [], // Add the products array to each pack object
          };
        });

        // Filter out packs with no products
        const packsWithProducts = packsWithReviews.filter(pack => pack.prods.length > 0);

        const topRatedPacks = packsWithProducts.sort((a, b) => b.averageRating - a.averageRating).slice(0, 4);
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

  const handleShowProducts = (pack) => {
    setSelectedPack(pack);
    setIsProductModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsProductModalVisible(false);
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
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.innerCard}
              onPress={() => handleShowProducts(item)}
              // onPress={() => handleNavigateToDetails(item)}
            >
              <Image source={{ uri: item.imgUrl }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.reviews}>{`${item.totalReviews} 👤 ⭐: ${item.averageRating}`}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.productsButton} onPress={() => handleShowProducts(item)}>
              <Text style={styles.productsButtonText}>View Products</Text>
            </TouchableOpacity>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {isProductModalVisible && (
        <ProductModal pack={selectedPack} packId={selectedPack.id} visible={isProductModalVisible} onClose={handleCloseModal} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#dba617',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginRight: 20,
    width: 240,
    height: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  innerCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 15,
  },
  info: {
    marginTop: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    color: '#2c3e50',
  },
  reviews: {
    color: '#7f8c8d',
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  productsButton: {
    backgroundColor: '#dba617',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  productsButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TopPacks;
