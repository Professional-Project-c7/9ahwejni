import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for close icon
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons for delete icon
import AsyncStorage from '@react-native-async-storage/async-storage';

const Panier = ({ navigation }) => {

  const [posts, setPosts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
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
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = () => {
    navigation.navigate('Tabs');
  };
  const handlepayment = () => {
    AsyncStorage.setItem('PRICE', JSON.stringify(totalPrice))
    navigation.navigate('Paye');
  };
  const handleDeleteItem = async (itemId) => {
    const updatedPosts = posts.filter(item => item.id !== itemId);
    setPosts(updatedPosts);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedPosts));
      calculateTotalPrice(updatedPosts);
    } catch (error) {
      console.log('Error updating favorites:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += item.price;
    });
    setTotalPrice(totalPrice);
  };
  console.log(totalPrice);

  return (
    <View style={styles.container}>
      <Icon name="arrow-left" size={30} style={styles.backIcon} onPress={handleAddToCart} />
      <ScrollView>
        <FlatList
          data={posts}
          // keyExtractor={(item) => item.id.toString()} 
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
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.paymentButton} onPress={handlepayment}>
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
    color: 'rgba(253,190,29,1)',
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
    color: '#4b2e83',
  },
  description: {
    color: '#6e695b',
    fontSize: 16,
    flexWrap: 'wrap',
    marginBottom: 10,
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
    backgroundColor: 'rgba(253,190,29,1)',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Panier;
