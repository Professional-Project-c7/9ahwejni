import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useProducts } from '../redux/products/productHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';

const ProductList = ({ navigation, route }) => {
  const { coffeeShopId } = route.params;
  const { products, getProducts, status } = useProducts();
  const [favorites, setFavorites] = useState({});
  const [productsWithReviews, setProductsWithReviews] = useState([]);
  const [shopTitle, setShopTitle] = useState('');
  const [shopAddress, setShopAddress] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      getProducts();
    }
  }, [status, getProducts]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/review`);

        const productsWithReviews = products.map(product => {
          const productReviews = reviewsResponse.data.filter(review => review.prodId === product.id);
          const totalReviews = productReviews.length;
          const averageRating = totalReviews ? productReviews.reduce((acc, review) => acc + review.stars, 0) / totalReviews : 0;
          return {
            ...product,
            totalReviews,
            averageRating: averageRating.toFixed(1),
          };
        });

        setProductsWithReviews(productsWithReviews);
      } catch (err) {
        console.error('Error fetching product reviews:', err);
      }
    };

    if (products.length > 0) {
      fetchReviews();
    }
  }, [products]);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/user/${coffeeShopId}`);
        setShopTitle(response.data.FirstName + ' ' + response.data.LastName);
        setShopAddress(response.data.Address);
      } catch (error) {
        console.log('Error fetching shop details:', error);
      }
    };

    fetchShopDetails();
  }, [coffeeShopId]);

  const handleCreateOrJoinChatRoom = async () => {
    try {
      // // Check if the room already exists
      // const checkResponse = await axios.get(`http://${ipAdress}:3000/api/roomRouter`, {
      //   params: { name: shopTitle }
      // });

      // let roomId;
      // if (checkResponse.data && checkResponse.data.length > 0) {
      //   // Room exists, get the room ID
      //   roomId = checkResponse.data[0].id;
      // } else {
        // Room does not exist, create a new room
        const value = await AsyncStorage.getItem('IdUser');
        const userId = JSON.parse(value);

        const createResponse = await axios.post(`http://${ipAdress}:3000/api/roomRouter`, { name: shopTitle });
       var roomId = createResponse.data.id;
      // }

      // Add user to the room
      await axios.post(`http://${ipAdress}:3000/api/roomRouter/user`, { roomId, userId });

      // Navigate to the Chat screen
      navigation.navigate('chat', { roomId,  shopTitle });
    } catch (error) {
      console.error('Error checking or creating chat room:', error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <IconButton
          icon="chat"
          iconColor="black"
          onPress={handleCreateOrJoinChatRoom}
        />
      </View>
      <ScrollView>
        {productsWithReviews.length > 0 ? (
          <>
            <Title style={styles.shopTitle}>{productsWithReviews[0].shopName}</Title>
            <Image
              style={styles.shopImage}
              source={{ uri: productsWithReviews[0].shopImage }}
            />
            <Text style={styles.shopAddress}>{productsWithReviews[0].shopAddress} 📍</Text>
            <Title style={styles.productListTitle}>Products:</Title>
            <View style={styles.productsContainer}>
              {productsWithReviews.map((product, index) => {
                const isLastOddCard = productsWithReviews.length % 2 !== 0 && index === productsWithReviews.length - 1;
                return (
                  <View style={[styles.card, isLastOddCard && styles.lastOddCard]} key={product.id}>
                    <TouchableOpacity onPress={() => handleNavigateToDetails(product)}>
                      <Image source={{ uri: product.imgUrl }} style={styles.image} />
                    </TouchableOpacity>
                    <Icon
                      name={favorites[product.id]?.favored ? 'heart' : 'heart-outline'}
                      color={favorites[product.id]?.favored ? 'red' : '#dba617'}
                      size={27}
                      onPress={() => toggleFeature(product.id, 'favored')}
                      style={styles.favIcon}
                    />
                    <View style={styles.infoContainer}>
                      <TouchableOpacity onPress={() => handleNavigateToDetails(product)}>
                        <Text style={styles.name}>{product.name}</Text>
                      </TouchableOpacity>
                      <Text style={styles.price}>${product.price}</Text>
                      <Text style={styles.reviews}>{`${product.totalReviews} 👤 ⭐: ${product.averageRating}`}</Text>
                      <Icon
                        name={favorites[product.id]?.inCart ? 'cart' : 'cart-outline'}
                        size={24}
                        onPress={() => toggleFeature(product.id, 'inCart')}
                        style={styles.cartIcon}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          <>
            <Title style={styles.shopTitle}>{shopTitle}</Title>
            <Text style={styles.shopAddress}>{shopAddress} 📍</Text>
            <Text style={styles.noProductsMessage}>This coffee shop has no products at the moment! 😔</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  shopTitle: {
    fontSize: 31,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    color: '#dba617',
  },
  shopImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: '#fff',
    marginBottom: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  shopAddress: {
    fontSize: 21,
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  productListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
    color: '#dba617',
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
  description: {
    fontSize: 14,
    color: '#666',
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
  noProductsMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#FF6347',
    borderRadius: 50,
    textAlign: 'left',
    padding: 20,
    marginTop: 20,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ProductList;
