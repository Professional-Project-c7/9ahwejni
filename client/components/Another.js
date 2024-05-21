import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Favorites = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('favv');
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        setPosts(parsedPosts);
      } else {
        console.log('No posts found in AsyncStorage');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleDeleteItem = async (itemId) => {
    const updatedPosts = posts.filter(item => item.id !== itemId);
    setPosts(updatedPosts);
    try {
      await AsyncStorage.setItem('favv', JSON.stringify(updatedPosts));
    } catch (error) {
      console.log('Error updating favorites:', error);
    }
  };

  const handleAddToCart = (itemId) => {
    console.log('Add to cart item id:', itemId);
    // Add your logic for adding the item to the cart here
  };

  const handleViewProduct = async (productId) => {
    await AsyncStorage.setItem('selectedProductId', productId);
    navigation.navigate('prd');
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => handleViewProduct(item.id)} style={styles.card}>
            <Image style={styles.cardImage} source={{ uri: item.imgUrl }} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCart(item.id)}>
                  <MaterialIcon name="add-shopping-cart" size={24} color="#00aaff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
                  <MaterialIcon name="delete" size={24} color="#ff6347" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f3ef',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    overflow: 'hidden',
  },
  cardImage: {
    width: 120,
    height: 120,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    color: '#6e695b',
    fontSize: 14,
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#38761d',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cartButton: {
    marginRight: 15,
  },
  deleteButton: {
    marginLeft: 10,
  },
  separator: {
    height: 10,
  },
});

export default Favorites;
