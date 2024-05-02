import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Text, IconButton } from 'react-native-paper';
import heart from '../image/favorite.png';
import { useProducts } from '../redux/products/productHooks';

const HoverableIconButton = ({ onAddPress }) => (
  <IconButton
    icon="plus-circle"
    iconColor="#dba617"  
    size={40}
    onPress={onAddPress}
    style={{ margin: 10 }}
  />
);

const ProductList = () => {
  const { products, getProducts, status } = useProducts();
  const [favorites, setFavorites] = React.useState({});
  const userId = 1; // User ID to filter products

  useEffect(() => {
    getProducts();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = products.filter(product => product.UserId === userId);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {filteredProducts.length > 0 && (
          <>
            <Title style={styles.shopTitle}>
              {filteredProducts[0].shopTitle}: {filteredProducts[0].shopName || 'Default Shop Name'}
            </Title>
            <Image 
              style={styles.shopImage}
              source={{ uri: 'https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&w=600' }}
            />
            <Text style={styles.shopSubtitle}>Explore Our Exclusive Coffee Collection</Text>
          </>
        )}
        
        <Title style={styles.productListTitle}>My Products</Title>
        {status === 'loading' ? (
          <Text>Loading...</Text>
        ) : filteredProducts.map((product) => (
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
                    style={[styles.icon, { tintColor: favorites[product.id] ? 'red' : '#FFF' }]}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Title style={styles.productTitle}>{product.name}</Title>
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
    borderWidth: 0.7, 
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
