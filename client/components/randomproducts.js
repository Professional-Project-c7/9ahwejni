import React from 'react';
import { View, Image, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const RandomProducts = () => {

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
   
  ];

  
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  
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
          numColumns={2} 
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.imageCoffee} />
                <View style={styles.overlay}>
                  <Text style={styles.titleCoffee}>{item.name}</Text>
                  <Text style={styles.titleCoffee}>Price: {item.price}</Text>
                </View>
                <IconButton
                  icon="plus-circle"
                  iconColor="rgba(219, 166, 23, 0.7)"
                  size={28}
                  style={styles.iconButton}
                />
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
    textAlign: 'center',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dba617',
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
    flex: 1,
    width: '45%',
    aspectRatio: 1,
    margin: '2.5%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    flex: 1,
    overflow: 'hidden',
  },
  imageCoffee: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(219, 166, 23, 0.4)',
    padding: 10,
  },
  iconButton: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    left: 5,
  },
  titleCoffee: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  }
});

export default RandomProducts;
