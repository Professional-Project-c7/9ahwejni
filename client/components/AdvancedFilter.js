import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import { Text, Button, Divider, Card, List, Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';

const AdvancedFilter = () => {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const navigation = useNavigation();

  const categories = [
    { label: 'Coffee', value: 'coffee' },
    { label: 'Drink', value: 'drink' },
    { label: 'Cake', value: 'cake' },
    { label: 'Packs', value: 'packs' },
    { label: 'All', value: '' },
  ];

  useEffect(() => {
    const fetchProductsAndReviews = async () => {
      try {
        const productsResponse = await axios.get(`http://${ipAdress}:3000/api/product`);
        const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/review`);

        const productsWithReviews = productsResponse.data.map(product => {
          const productReviews = reviewsResponse.data.filter(review => review.prodId === product.id);
          const totalReviews = productReviews.length;
          const averageRating = totalReviews
            ? productReviews.reduce((acc, review) => acc + review.stars, 0) / totalReviews
            : 0;
          
          return {
            ...product,
            totalReviews,
            averageRating: averageRating.toFixed(1),
          };
        });

        setProducts(productsWithReviews);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsAndReviews();
  }, []);

  const filterProducts = () => {
    let filteredProductsList = products.filter(product => {
      return (!selectedCategories.length || selectedCategories.includes(product.category)) &&
             (!minPrice || product.price >= parseFloat(minPrice)) &&
             (!maxPrice || product.price <= parseFloat(maxPrice)) &&
             (!rating || product.averageRating >= parseFloat(rating));
    });

    setFilteredProducts(filteredProductsList);
    setResultsModalVisible(true);
  };

  const handleCategorySelect = (value) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((category) => category !== value)
        : [...prevSelected, value]
    );
  };

  const handleNavigateToDetails = async (product) => {
    try {
      await AsyncStorage.setItem('selectedProductId', product.id.toString());
      navigation.navigate('prd', { product });
    } catch (error) {
      console.error('Error navigating to product details:', error);
    }
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleNavigateToDetails(item)}>
      <List.Item
        title={item.name}
        description={`(${item.totalReviews} ratings) ⭐: ${item.averageRating}, Price: $${item.price}`}
        left={() =>
          item.imgUrl ? (
            <Avatar.Image size={54} source={{ uri: item.imgUrl }} />
          ) : (
            <Avatar.Icon size={54} icon="folder" />
          )
        }
        style={styles.dropdownItem}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.fullScreenCard}>
      <Card style={styles.fullScreenCard}>
        <Card.Title title="Advanced Filter" titleStyle={styles.cardTitle} />
        <Divider style={styles.divider} />
        <Text style={styles.label}>Category</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => {
            const isSelected = selectedCategories.includes(item.value);
            return (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  isSelected ? styles.selectedCategoryItem : styles.unselectedCategoryItem,
                ]}
                onPress={() => handleCategorySelect(item.value)}
              >
                <Text style={styles.categoryText}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.value}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 20 }}
        />
        <Text style={styles.label}>Minimum Price</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter minimum price"
          value={minPrice}
          onChangeText={setMinPrice}
          style={styles.filterInput}
        />
        <View style={styles.spaceBetweenInputs} />
        <Text style={styles.label}>Maximum Price</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter maximum price"
          value={maxPrice}
          onChangeText={setMaxPrice}
          style={styles.filterInput}
        />
        <View style={styles.spaceBetweenInputs} />
        <Text style={styles.label}>Rating</Text>
        <Picker
          selectedValue={rating}
          style={styles.picker}
          onValueChange={setRating}
          itemStyle={{ height: 44 }}
        >
          <Picker.Item label="Please select a rating" value="" />
          <Picker.Item label="1 Star" value="1" />
          <Picker.Item label="2 Stars" value="2" />
          <Picker.Item label="3 Stars" value="3" />
          <Picker.Item label="4 Stars" value="4" />
          <Picker.Item label="5 Stars" value="5" />
        </Picker>
        <View style={styles.spaceBetweenInputs} />
        <Button mode="contained" style={styles.button} onPress={filterProducts}>
          Apply Filter
        </Button>
      </Card>
      <Modal
        visible={resultsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setResultsModalVisible(false)}
      >
        <View style={styles.resultsModalContainer}>
          <View style={styles.resultsModalContent}>
            <FlatList
              data={filteredProducts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderDropdownItem}
              style={styles.resultsDropdownList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenCard: {
    flex: 1,
    padding: 2.5,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 26,
    color: '#dba617',
  },
  divider: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryItem: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 22,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryItem: {
    backgroundColor: '#dba617',
  },
  unselectedCategoryItem: {
    backgroundColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#dba617',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
  },
  filterInput: {
    backgroundColor: '#fff',
    borderColor: '#dba617',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  button: {
    backgroundColor: '#dba617',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  spaceBetweenInputs: {
    marginVertical: 5,
  },
  dropdownItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
  },
  resultsModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  resultsModalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  resultsDropdownList: {
    marginTop: 10,
  },
});

export default AdvancedFilter;
