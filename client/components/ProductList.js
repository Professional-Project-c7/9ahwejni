import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';
import { Title , IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useProducts } from '../redux/products/productHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';
import AddReviewz from './AddReviewz';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import chatcoffee from '../image/chatcoffee.png';
const ProductList = ({ navigation, route }) => {
  const { coffeeShopId } = route.params;
  const { products, getProducts, status, error } = useProducts();
  const [favorites, setFavorites] = useState({});
  const [productsWithReviews, setProductsWithReviews] = useState([]);
  const [shopDetails, setShopDetails] = useState({});
  const [totalShopReviews, setTotalShopReviews] = useState(0);
  const [averageShopRating, setAverageShopRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const value = await AsyncStorage.getItem('IdUser');
        if (value !== null) {
          setUserId(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      getProducts();
    }
  }, [status, getProducts]);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/user/${coffeeShopId}`);
        setShopDetails(response.data);
      } catch (error) {
        console.log('Error fetching shop details:', error);
      }
    };

    fetchShopDetails();
  }, [coffeeShopId]);

  const fetchReviews = async () => {
    try {
      const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/review`);
      const shopReviewsResponse = await axios.get(`http://${ipAdress}:3000/api/reviewz/reviewee/${coffeeShopId}`);

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

      const totalReviews = shopReviewsResponse.data.length;
      const averageRating = totalReviews ? shopReviewsResponse.data.reduce((acc, review) => acc + review.stars, 0) / totalReviews : 0;

      setTotalShopReviews(totalReviews);
      setAverageShopRating(averageRating.toFixed(1));
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      fetchReviews();
    }
  }, [products]);

  const toggleFeature = async (id, feature) => {
    try {
      const isFavorited = favorites[id]?.[feature];
      const product = productsWithReviews.find((product) => product.id === id);
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

        ToastAndroid.showWithGravity('Item added to cart', ToastAndroid.SHORT, ToastAndroid.TOP);
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

  const filteredProducts = productsWithReviews.filter((product) => product.userId === coffeeShopId);

  const handleCreateOrJoinChatRoom = async () => {
    try {
        // Room does not exist, create a new room
        const value = await AsyncStorage.getItem('IdUser');
        const userId = JSON.parse(value);
        var RoomName = shopDetails.FirstName

        const createResponse = await axios.post(`http://${ipAdress}:3000/api/roomRouter`, { name: RoomName});
       var roomId = createResponse.data.id;

      // Add user to the room
      await axios.post(`http://${ipAdress}:3000/api/roomRouter/user`, { roomId, userId });
      // Navigate to the Chat screen
      navigation.navigate('chat', { roomId,  RoomName });
    } catch (error) {
      console.error('Error checking or creating chat room:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {filteredProducts.length > 0 ? (
          <>
            <View style={styles.header}>
              <Title style={styles.shopTitle}>{shopDetails.FirstName} {shopDetails.LastName}</Title>
              <TouchableOpacity onPress={handleCreateOrJoinChatRoom}>
                <Image source={chatcoffee} style={styles.chatIcon} />
              </TouchableOpacity>
            </View>
            <Image
              style={styles.shopImage}
              source={{ uri: shopDetails.ImageUrl }}
            />
            <Text style={styles.shopAddress}>{shopDetails.Address} 📍</Text>
            <Text style={styles.shopReviews}>{`Total Reviews: ${totalShopReviews}⭐ Average Rating: ${averageShopRating}`}</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <LinearGradient
                colors={['rgba(219, 166, 23, 1)', 'rgba(219, 166, 23, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Rate this shop</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Title style={styles.productListTitle}>Products:</Title>
            <View style={styles.productsContainer}>
              {filteredProducts.map((product, index) => {
                const isLastOddCard = filteredProducts.length % 2 !== 0 && index === filteredProducts.length - 1;
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
            <View style={styles.header}>
              <Title style={styles.shopTitle}>{shopDetails.FirstName} {shopDetails.LastName}</Title>
              <TouchableOpacity onPress={handleCreateOrJoinChatRoom}>
                <Image source={chatcoffee} style={styles.chatIcon} />
              </TouchableOpacity>
            </View>
            <Image
              style={styles.shopImage}
              source={{ uri: shopDetails.ImageUrl }}
            />
            <Text style={styles.shopAddress}>{shopDetails.Address} 📍</Text>
            <Text style={styles.shopReviews}>{`Total Reviews: ${totalShopReviews} ⭐ Average Rating: ${averageShopRating}`}</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <LinearGradient
                colors={['rgba(219, 166, 23, 1)', 'rgba(219, 166, 23, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Rate this shop</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.noProductsMessage}>This coffee shop has no products at the moment! 😔</Text>
          </>
        )}
      </ScrollView>
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <AddReviewz
              coffeeShopId={coffeeShopId}
              userId={userId}
              onClose={() => setIsModalVisible(false)}
              onReviewSubmitted={fetchReviews}
            />
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopTitle: {
    fontSize: 31,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    color: '#dba617',
    fontStyle: 'italic'

  },
  chatIcon: {
    width: 40,
    height: 40,
    marginRight: 5,
    marginTop: 10,
   bottom : 7
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
    fontStyle: 'italic',
  },
  shopReviews: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
    fontStyle: 'italic'
  },
  gradientButton: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  productListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
    color: '#dba617',
    fontStyle: 'italic'
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
    fontStyle: 'italic'
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
    fontStyle: 'italic'
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
    fontStyle: 'italic'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#dba617',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductList;
