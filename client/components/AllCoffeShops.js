import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import { FontAwesome } from 'react-native-vector-icons';

const coffeeShopsData = [
  {
    id: '1',
    name: 'The Beanery: A Coffee Lover Paradise',
    imageUrl: 'https://media.istockphoto.com/id/1428594094/photo/empty-coffee-shop-interior-with-wooden-tables-coffee-maker-pastries-and-pendant-lights.jpg?s=612x612&w=0&k=20&c=dMqeYCJDs3BeBP_jv93qHRISDt-54895SPoVc6_oJt4=',
    rating: 4.4,
    reviews: 532,
  },
  {
    id: '2',
    name: 'Bean Haven: A Retreat for Coffee Aficionados',
    imageUrl: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.5,
    reviews: 300,
  },
];

const CoffeeShopsList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Shop</Text>
      <View style={styles.searchSection}>
        {/* <FontAwesome style={styles.searchIcon} name="search" size={20} color="#000"/> */}
        <TextInput
          style={styles.input}
          placeholder="Search..."
        />
      </View>
      <FlatList
        data={coffeeShopsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              style={styles.image}
              source={{ uri: item.imageUrl }}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.ratingSection}>
                {/* <FontAwesome name="star" size={20} color="#ffd700" /> */}
                <Text style={styles.ratingText}>{` ${item.rating} (${item.reviews} reviews)`}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              {/* <FontAwesome name="heart-o" size={24} color="tomato" /> */}
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    margin: 20,
    paddingLeft: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#424242',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
  },
  favoriteButton: {
    padding: 10,
  },
});

export default CoffeeShopsList;