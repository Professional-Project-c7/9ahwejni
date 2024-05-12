import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Title } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useProducts } from '../redux/products/productHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductList = ({ navigation ,route}) => {
  const { coffeeShopId } = route.params;
  const { products, getProducts, status, error } = useProducts();
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (status === 'idle') {
      getProducts();
    }
  }, [status, getProducts]);

  const toggleFeature = (id, feature) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [feature]: !prev[id]?.[feature],
      },
    }));
  };
  const handleNavigateToDetails = async (product) => {
    try {
     
      await AsyncStorage.setItem('selectedProductId', product.id.toString());
      navigation.navigate('prd', { product });
    } catch (error) {
      console.log('Error storing selected product ID:', error);
    }
  };

  // Filter products based on the selected Coffee Shop ID
  const filteredProducts = products.filter((product) => product.userId === coffeeShopId);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {filteredProducts.length > 0 && (
          <>
            <Title style={styles.shopTitle}>{filteredProducts[0].shopName}</Title>
            <Image
              style={styles.shopImage}
              source={{ uri: filteredProducts[0].imgUrl }}
            />
          </>
        )}

        <Title style={styles.productListTitle}>My Products</Title>
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
                onPress={() => toggleFeature(product.id, 'favored')}
                style={styles.favIcon}
              />
              <View style={styles.infoContainer}>
                <TouchableOpacity onPress={() => handleNavigateToDetails(product)}>
                  <Text style={styles.name}>{product.name}</Text>
                </TouchableOpacity>
                <Text style={styles.price}>${product.price}</Text>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={20}
                  startingValue={product.rating}
                  onFinishRating={(rating) => console.log('New rating is: ', rating)}
                  style={styles.starRating}
                />
                <Icon
                  name={favorites[product.id]?.inCart ? 'cart' : 'cart-outline'}
                  color={favorites[product.id]?.inCart ? 'red' : 'white'}
                  size={24}
                  onPress={() => toggleFeature(product.id, 'inCart')}
                  style={styles.cartIcon}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  shopTitle: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    color: '#3e3e3e',
  },
  shopImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: '#3e3e3e',
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  productListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
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
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 20,
    color: '#000',
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

export default ProductList;
