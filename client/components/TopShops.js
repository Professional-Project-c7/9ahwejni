// TopShops.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { ipAdress } from '../config';
import { useNavigation } from '@react-navigation/native';

const TopShops = ({ navigation }) => {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/user/`);
        const filteredShops = response.data.filter(user => user.UserType === "coffee");
        const shuffledShops = filteredShops.sort(() => 0.5 - Math.random());
        setCoffeeShops(shuffledShops.slice(0, 6));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCoffeeShops();
  }, []);

  const handleNavigateToProductList = (coffeeShopId, shopName, shopImageUrl) => {
    navigation.navigate('ProductList', { coffeeShopId, shopName, shopImageUrl });
  };

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={coffeeShops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleNavigateToProductList(item.id, `${item.FirstName} ${item.LastName}`, item.ImageUrl)}
          >
            <Image source={{ uri: item.ImageUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.FirstName} {item.LastName}</Text>
              <Text style={styles.address}>{item.Address}</Text>
              {/* <View style={styles.ratingSection}>
                <Text style={styles.ratingText}>{`${item.rating || 0} (${item.reviews || 0} reviews)`}</Text>
              </View> */}
            </View>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    width: 200,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 18,
    color: '#555',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default TopShops;
