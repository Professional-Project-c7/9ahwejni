import React, { useState } from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ipAdress } from '../config';
import axios from 'axios';
// import { useProducts } from '../redux/products/productHooks';

const RandomProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Espresso',
      price: '$5.0',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb85z7x-CAJH444E2lGKpe9VvY3xBohCuIXw&s',
      rating: 0,
      reviews: 12,
      favored: false,
      inCart: false,
    },
    {
      id: 2,
      name: 'Cappuccino',
      price: '$9.50',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb85z7x-CAJH444E2lGKpe9VvY3xBohCuIXw&s',
      rating: 0,
      reviews: 18,
      favored: false,
      inCart: false,
    },
    {
      id: 3,
      name: 'Latte',
      price: '$10.0',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb85z7x-CAJH444E2lGKpe9VvY3xBohCuIXw&s',
      rating: 0,
      reviews: 25,
      favored: false,
      inCart: false,
    },
    {
      id: 4,
      name: 'Latte',
      price: '$10.0',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb85z7x-CAJH444E2lGKpe9VvY3xBohCuIXw&s',
      rating: 0,
      reviews: 25,
      favored: false,
      inCart: false,
    }
  ]);

  // const RandomProducts = () => {
    //   const [products, setProducts] = useState([]);
    //   const [error, setError] = useState(null);
    
    //   useEffect(() => {
    //     const fetchProducts = async () => {
    //       try {
    //         const response = await axios.get(`http://${ipAdress}:3000/api/product/`);
    //         const shuffledProducts = response.data.sort(() => 0.5 - Math.random());
    //         setProducts(shuffledProducts.slice(0, 4));
    //       } catch (err) {
    //         setError(err.message);
    //       }
    //     };

  const toggleFeature = (id, feature) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        return { ...product, [feature]: !product[feature] };
      }
      return product;
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Icon
              name={item.favored ? 'heart' : 'heart-outline'}
              color={item.favored ? 'red' : '#dba617'}
              size={26}
              onPress={() => toggleFeature(item.id, 'favored')}
              style={styles.favIcon}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <View style={styles.ratingSection}>
                <Text style={styles.ratingText}>{`${item.rating} (${item.reviews} reviews)`}</Text>
              </View>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={20}
                startingValue={item.rating}
                onFinishRating={(rating) => console.log('New rating is: ', rating)}
                style={styles.starRating}
              />
              <Icon
                name={item.inCart ? 'cart' : 'cart-outline'}
                color={item.inCart ? 'red' : 'white'}
                size={24}
                onPress={() => toggleFeature(item.id, 'inCart')}
                style={styles.cartIcon}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 25,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.8,
  },
  image: {
    height: 200,
    width: '100%',
    alignSelf: 'center',
  },
  favIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  infoContainer: {
    padding: 55,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  name: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',
    top: 10,
    left: 5,
  },
  price: {
    fontSize: 23,
    color: '#000',
    right: 51,
    bottom: 7,
  },
  starRating: {
    position: 'absolute',
    left: 5,
    bottom: 10,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 5,
    bottom: 35,
  },
  ratingText: {
    fontSize: 16,
  },
  cartIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#dba617',
    padding: 8,
    borderRadius: 15,
  },
});

export default RandomProducts;