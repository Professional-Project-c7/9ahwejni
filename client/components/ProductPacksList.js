import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';

// Import images for each pack (Replace '../path/to/' with actual paths to your images)
import soloPackImage from '../image/4.png';
import duoPackImage from '../image/4.png';
import familyPackImage from '../image/4.png';

// Sample data for coffee, juice, and cake - Add more items as needed
const coffeeData = [
  {
    id: '1',
    title: 'Premium Coffee',
    description: `Premium quality coffee blend for a perfect start to your day.`,
    image: require("../image/4.png"),
    rating: 4,
    reviews: 99,
    price: 4.99,
    available: true,
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: '2',
    title: 'Premium Coffee',
    description: `Premium quality coffee blend for a perfect start to your day.`,
    image: require("../image/4.png"),
    rating: 4,
    reviews: 99,
    price: 4.99,
    available: true,
    sizes: ['Small', 'Medium', 'Large'],
  },
];
const juiceData = [
  {
    id: '1',
    title: 'Fresh Juice',
    description: `Freshly squeezed juice made from organic fruits.`,
    image: require("../image/4.png"),
    rating: 4.5,
    reviews: 120,
    price: 3.99,
    available: true,
    sizes: ['Regular', 'Large'],
  },
];
const cakeData = [
  {
    id: '1',
    title: 'Delicious Cake',
    description: `Delicious cake baked with love, perfect for any occasion.`,
    image: require("../image/4.png"),
    rating: 5,
    reviews: 150,
    price: 19.99,
    available: false,
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: '2',
    title: 'Delicious Cake',
    description: `Delicious cake baked with love, perfect for any occasion.`,
    image: require("../image/4.png"),
    rating: 5,
    reviews: 150,
    price: 19.99,
    available: false,
    sizes: ['Small', 'Medium', 'Large'],
  },
];

const ProductPacksList = () => {
  const [selectedPack, setSelectedPack] = useState(null);
  const [selectedCoffeeQuantity, setSelectedCoffeeQuantity] = useState(1);
  const [selectedJuiceQuantity, setSelectedJuiceQuantity] = useState(1);
  const [selectedCakeQuantity, setSelectedCakeQuantity] = useState(1);

  const renderSizeOptions = (sizes) => sizes.map((size, index) => (
    <TouchableOpacity key={index} style={styles.sizeButton}>
      <Text style={styles.sizeButtonText}>{size}</Text>
    </TouchableOpacity>
  ));

  const renderAvailabilityIndicator = (available) => available ? (
    <Text style={styles.availableText}>Available</Text>
  ) : (
    <Text style={styles.unavailableText}>Out of Stock</Text>
  );

  const renderQuantitySelector = (quantity, setQuantity) => (
    <View style={styles.quantitySelector}>
      <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProducts = (products, selectedQuantity, setSelectedQuantity) => (
    <FlatList
      data={products}
      horizontal={true}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image source={item.image} style={styles.cardImg} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDetails}>{item.description}</Text>
            {renderSizeOptions(item.sizes)}
            {renderAvailabilityIndicator(item.available)}
            <Text style={styles.cardDetails}>Price: ${item.price.toFixed(2)}</Text>
            {renderQuantitySelector(selectedQuantity, setSelectedQuantity)}
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.contentContainer}
    />
  );

  return (
    <ScrollView>
     
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setSelectedPack('Solo Pack')} style={styles.pack}>
          <Image source={soloPackImage} style={styles.packImage} />
          <Text style={styles.packTitle}>Solo Pack</Text>
        </TouchableOpacity>
        {selectedPack === 'Solo Pack' && (
          <View>
            <Text style={styles.packSubtitle}>Coffee Pack</Text>
            {renderProducts(coffeeData, selectedCoffeeQuantity, setSelectedCoffeeQuantity)}
            <Text style={styles.packSubtitle}>Juice Pack</Text>
            {renderProducts(juiceData, selectedJuiceQuantity, setSelectedJuiceQuantity)}
            <Text style={styles.packSubtitle}>Cake Pack</Text>
            {renderProducts(cakeData, selectedCakeQuantity, setSelectedCakeQuantity)}
          </View>
        )}

        <TouchableOpacity onPress={() => setSelectedPack('Duo Pack')} style={styles.pack}>
          <Image source={duoPackImage} style={styles.packImage} />
          <Text style={styles.packTitle}>Duo Pack</Text>
        </TouchableOpacity>
        {selectedPack === 'Duo Pack' && (
          <View>
            <Text style={styles.packSubtitle}>Coffee Pack</Text>
            {renderProducts(coffeeData, selectedCoffeeQuantity, setSelectedCoffeeQuantity)}
            <Text style={styles.packSubtitle}>Juice Pack</Text>
            {renderProducts(juiceData, selectedJuiceQuantity, setSelectedJuiceQuantity)}
            <Text style={styles.packSubtitle}>Cake Pack</Text>
            {renderProducts(cakeData, selectedCakeQuantity, setSelectedCakeQuantity)}
          </View>
        )}

        <TouchableOpacity onPress={() => setSelectedPack('Family Pack')} style={styles.pack}>
          <Image source={familyPackImage} style={styles.packImage} />
          <Text style={styles.packTitle}>Family Pack</Text>
        </TouchableOpacity>
        {selectedPack === 'Family Pack' && (
          <View>
            <Text style={styles.packSubtitle}>Coffee Pack</Text>
            {renderProducts(coffeeData, selectedCoffeeQuantity, setSelectedCoffeeQuantity)}
            <Text style={styles.packSubtitle}>Juice Pack</Text>
            {renderProducts(juiceData, selectedJuiceQuantity, setSelectedJuiceQuantity)}
            <Text style={styles.packSubtitle}>Cake Pack</Text>
            {renderProducts(cakeData, selectedCakeQuantity, setSelectedCakeQuantity)}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  pack: {
    marginBottom: 20,
  },
  packTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  packSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardImgWrapper: {
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  cardInfo: {
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
    marginBottom: 5,
  },
  sizeButton: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  sizeButtonText: {
    fontSize: 14,
  },
  availableText: {
    color: 'green',
    fontWeight: 'bold',
  },
  unavailableText: {
    color: 'red',
    fontWeight: 'bold',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ProductPacksList;