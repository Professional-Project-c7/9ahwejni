import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Panier = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchData = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('favorites');
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        setPosts(parsedPosts);
        calculateTotalPrice(parsedPosts);
      }
    } catch (error) {
      console.log('Error fetching data:', error); 
      Alert.alert('Error', 'There was an error fetching your cart items.');
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

  const handleAddToCart = () => {
    navigation.navigate('Tabs');
  };

  const handlePayment = async () => {
    try {
      await AsyncStorage.setItem('PRICE', JSON.stringify(totalPrice));
      navigation.navigate('Paye');
    } catch (error) {
      console.log('Error saving total price:', error);
      Alert.alert('Error', 'There was an error processing your payment.');
    }
  };

  const handleDeleteItem = async (itemId) => {
    const updatedPosts = posts.filter(item => item.id !== itemId);
    setPosts(updatedPosts);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedPosts));
      calculateTotalPrice(updatedPosts);
    } catch (error) {
      console.log('Error updating favorites:', error);
      Alert.alert('Error', 'There was an error updating your cart.');
    }
  };

  const calculateTotalPrice = (items) => {
    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    setTotalPrice(totalPrice);
  };

  return (
    <View style={styles.container}>
      <Icon name="arrow-left" size={30} style={styles.backIcon} onPress={handleAddToCart} />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image style={styles.cardImage} source={{ uri: item.imgUrl }} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
                <MaterialIcon name="delete" size={24} color="#ff6347" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => <Text style={styles.emptyMessage}>Your cart is empty</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.paymentButtonText}>Go to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f3ef',
  },
  backIcon: {
    margin: 16,
    color: 'rgba(219, 166, 23, 1)',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  cardImage: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',

  },
  description: {
    color: '#6e695b',
    fontSize: 16,
    flexWrap: 'wrap',
    marginBottom: 10,
    fontStyle: 'italic',

  },
  price: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#38761d',
    
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  separator: {
    height: 2,
    backgroundColor: '#ececec',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#6e695b',
    marginTop: 20,
    fontStyle: 'italic',

  },
  footer: {
    padding: 20,
    borderTopWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
    
  },
  paymentButton: {
    marginTop: 12,
    backgroundColor: 'rgba(219, 166, 23, 1)',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',

  },
});

export default Panier;
