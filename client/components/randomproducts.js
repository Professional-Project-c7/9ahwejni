import React from 'react';
import { View, Image, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const RandomProducts = () => {
  // Dummy data for coffees
  const coffees = [
    { id: 1, name: 'Coffee A', products: [
      { id: 1, name: 'Product A1', price: '$5', image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' },
      { id: 2, name: 'Product A2', price: '$6', image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' },
      { id: 3, name: 'Product A3', price: '$7', image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' },
      { id: 4, name: 'Product A4', price: '$8', image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' },
    ] },
    { id: 2, name: 'Coffee B', products: [
      { id: 5, name: 'Product B1', price: '$5', image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' },
      { id: 6, name: 'Product B2', price: '$6', image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' },
      { id: 7, name: 'Product B3', price: '$7', image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' },
      { id: 8, name: 'Product B4', price: '$8', image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' },
    ] },
    // Add more coffees with their products as needed
  ];

  // Function to generate a random number between min and max (inclusive)
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to get 4 random products from the array of all products
  const getRandomProducts = () => {
    const randomProducts = [];
    const numProducts = coffees.length;

    while (randomProducts.length < 4) {
      const randomIndex = getRandomNumber(0, numProducts - 1);
      const randomProduct = coffees[randomIndex];
      const randomProductIndex = getRandomNumber(0, randomProduct.products.length - 1);
      const randomProductItem = randomProduct.products[randomProductIndex];
      if (!randomProducts.includes(randomProductItem)) {
        randomProducts.push(randomProductItem);
      }
    }

    return randomProducts;
  };

  // Get 4 random products
  const randomProducts = getRandomProducts();

  return (
    <View>
      <View style={styles.top}>
        <Text style={styles.Texttitlecoffee} >Coffee For Today</Text>
        <Text style={styles.seeAllText} >See All</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={randomProducts}
          numColumns={2} // Set the number of columns to 2
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <View style={styles.imageBox}>
                <Image source={{ uri: item.image }} style={styles.imageCoffee} />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.titleCoffee}>{item.name}</Text>
                <Text style={styles.titleCoffee}>Price: {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  Texttitlecoffee: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: '#dba617',
    textAlign: 'center', // Center the text horizontally
    marginTop: 40, // Add some margin at the top
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dba617', // Black text color
    marginTop: 40,
    marginRight: 20
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  card: {
    flex: 1, // Set flex to 1 to evenly distribute items
    width: '45%', // Set width to 45% to fit two items in a row
    aspectRatio: 1, // Maintain aspect ratio for the item
    margin: '2.5%', // Set margin to evenly space items
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBox: {
    flex: 1,
    overflow: 'hidden',
  },
  imageCoffee: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  titleCoffee: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  }
});

export default RandomProducts;
