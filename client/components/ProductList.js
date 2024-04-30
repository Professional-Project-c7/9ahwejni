import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import img from '../image/circle.png';
import heart from '../image/favorite.png';
import { useProducts } from '../redux/products/productHooks'; 

const HoverableIconButton = ({ onAddPress }) => (
  <TouchableOpacity
    onPress={onAddPress}
    style={[styles.iconButton, { width: 60, height: 60 }]}
  >
    <Image
      source={img}
      style={[styles.icon, { width: 40, height: 40 }]}
    />
  </TouchableOpacity>
);

const ProductList = () => {
  const { products, getProducts, status } = useProducts();
  const [favorites, setFavorites] = React.useState({});

  useEffect(() => {
    getProducts(); 
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title style={styles.shopTitle}>The Beanery: A Coffee Lover's Paradise</Title>
        <Image 
          style={styles.shopImage}
          source={{ uri: 'https://via.placeholder.com/150' }}
        />
        <Text style={styles.shopSubtitle}>Explore Our Exclusive Coffee Collection</Text>
        
        <Title style={styles.productListTitle}>My Products</Title>
        {status === 'loading' ? (
          <Text>Loading...</Text>
        ) : products.map((product) => (
          <Card key={product.id} style={styles.productCard}>
            <Card.Content style={styles.productCardContent}>
              <View style={styles.imageContainer}>
                <Image 
                  style={styles.productImage}
                  source={{ uri: product.imgUrl }}
                />
                <TouchableOpacity
                  onPress={() => toggleFavorite(product.id)}
                  style={styles.heartButton}
                >
                  <Image
                    source={heart}
                    style={[styles.icon, { tintColor: favorites[product.id] ? 'red' : '#000' }]}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Title style={styles.productTitle}>{product.title}</Title>
                <Text style={styles.productDescription}>{product.description}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
              <HoverableIconButton 
                onAddPress={() => console.log('Add Pressed', product.id)}
              />
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shopTitle: {
    fontSize: 28,
    fontWeight: '700', 
    textAlign: 'center',
    marginTop: 16,
    color: '#3e3e3e', 
    fontFamily: 'Roboto',
  },
  shopImage: {
    width: '100%',
    height: 200, 
    resizeMode: 'cover',
    borderRadius: 8, 
    borderWidth: 0.5, 
    borderColor: '#3e3e3e', 
    marginBottom: 16, 
    overflow: 'hidden', 
    elevation: 2, 
  },
  shopSubtitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  productListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
  },
  productCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 1,
  },
  productCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 8,
  },
  productImage: {
    width: 133,
    height: 133,
    borderRadius: 0,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: 'gray',
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6f7e47',
  },
  iconButton: {
    padding: 10,
    margin: 5,
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    margin: 0,
  },
  icon: {
    width: 24,
    height: 24,
  }
});

export default ProductList;
