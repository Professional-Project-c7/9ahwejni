import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectProductById } from '../redux/products/productSelectors';

const ProductDetails = ({ route }) => {
  const { productId } = route.params;
  const product = useSelector(state => selectProductById(state, productId));

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.imgUrl }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20
  },
  price: {
    fontSize: 20,
    color: '#6f7e47',
    marginVertical: 10
  },
  description: {
    fontSize: 16
  }
});

export default ProductDetails;