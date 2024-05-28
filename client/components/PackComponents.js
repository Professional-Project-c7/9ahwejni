import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';

const ProductModal = ({ pack, visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <View style={styles.modal}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: pack.imgUrl }} style={styles.image} />
          </View>
          <Text style={styles.name}>{pack.name}</Text>
          <Text style={styles.price}>${pack.price}</Text>
          <Text style={styles.reviews}>{`${pack.totalReviews} 👤 ⭐: ${pack.averageRating}`}</Text>
          <Text style={styles.productTitle}>Products:</Text>
          <View style={styles.productContainer}>
            {pack.prods.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <Image source={{ uri: product.imgUrl }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productDescription}>{product.description}</Text>
                  <Text style={styles.productPrice}>${product.price}</Text>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2c3e50',
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: '#e74c3c',
  },
  reviews: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2c3e50',
  },
  productContainer: {
    width: '100%',
  },
  productItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  productDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProductModal;
