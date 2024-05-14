// Favorit.js
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const initialFavorites = [
  {
    id: '1',
    title: 'Espresso Delight',
    category: 'Espresso',
   
    rating: 4.8,
    isFavorite: true,
    logo: 'https://via.placeholder.com/80x80?text=ED',
  },
  {
    id: '2',
    title: 'Latte Love',
    category: 'Latte',
  
    rating: 4.7,
    isFavorite: false,
    logo: 'https://via.placeholder.com/80x80?text=LL',
  },
  {
    id: '3',
    title: 'Cappuccino Craze',
    category: 'Cappuccino',
   
    rating: 4.9,
    isFavorite: true,
    logo: 'https://via.placeholder.com/80x80?text=CC',
  },
  {
    id: '4',
    title: 'Mocha Magic',
    category: 'Mocha',
   
    rating: 4.8,
    isFavorite: true,
    logo: 'https://via.placeholder.com/80x80?text=MM',
  },
];

const Favorit = () => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.logo }} style={styles.logo} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.category}</Text>
        <View style={styles.row}>
          {/* <Icon name="location-outline" size={16} color="#9e9e9e" /> */}
          {/* <Text style={styles.location}>{item.location}</Text> */}
        </View>
        <View style={styles.row}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon
              key={index}
              name="star"
              size={16}
              color={index < Math.floor(item.rating) ? '#FFD700' : '#E0E0E0'}
            />
          ))}
          <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Icon
          name={item.isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={item.isFavorite ? '#FF0000' : '#9e9e9e'}
        />
      </TouchableOpacity>
     
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#9e9e9e',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  rating: {
    fontSize: 14,
    marginLeft: 5,
  },
  favoriteButton: {
    marginRight: 10,
  },
  openButton: {
    backgroundColor: '#00C853',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  openText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Favorit;