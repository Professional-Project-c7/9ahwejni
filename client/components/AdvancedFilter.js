import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Divider, Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useProducts } from '../redux/products/productHooks';
import { ipAdress } from '../config';
import axios from 'axios';

const AdvancedFilter = () => {
  const { products, getProducts } = useProducts();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/user/`);
        setUsers(response.data.filter((user) => user.UserType === 'coffee'));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
    getProducts();
  }, [getProducts]);

  const filterProductsAndUsers = () => {
    let filteredProductsList = products;
    let filteredUsersList = users;

    if (selectedCategories.length > 0 && !selectedCategories.includes('')) {
      filteredProductsList = filteredProductsList.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (minPrice) {
      filteredProductsList = filteredProductsList.filter((product) => product.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filteredProductsList = filteredProductsList.filter((product) => product.price <= parseFloat(maxPrice));
    }

    if (rating) {
      filteredProductsList = filteredProductsList.filter((product) => product.rating >= parseFloat(rating));
    }

    setFilteredProducts(filteredProductsList);
    setFilteredUsers(filteredUsersList);
  };

  const handleMinPriceChange = (price) => {
    setMinPrice(price);
  };

  const handleMaxPriceChange = (price) => {
    setMaxPrice(price);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCategorySelect = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const renderCategoryItem = ({ item }) => {
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
  };

  const categories = [
    { label: 'Coffee', value: 'coffee' },
    { label: 'Juice', value: 'drinks' },
    { label: 'Cake', value: 'cake' },
    { label: 'Packs', value: 'packs' },
    { label: 'All', value: '' },
  ];

  const renderProductItem = ({ item }) => (
    <Card style={styles.productCard}>
      <Card.Title title={item.name} subtitle={`Price: $${item.price} | Rating: ${item.rating}`} />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Advanced Filter" titleStyle={styles.cardTitle} />
        <Card.Content>
          <Divider style={styles.divider} />
          <Text style={styles.label}>Category</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
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
            onChangeText={handleMinPriceChange}
            style={styles.filterInput}
          />
          <View style={styles.spaceBetweenInputs} />
          <Text style={styles.label}>Maximum Price</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter maximum price"
            value={maxPrice}
            onChangeText={handleMaxPriceChange}
            style={styles.filterInput}
          />
          <View style={styles.spaceBetweenInputs} />
          <Text style={styles.label}>Rating</Text>
          <Picker
            selectedValue={rating}
            style={styles.picker}
            onValueChange={handleRatingChange}
          >
            <Picker.Item label="Please select a rating" value="" />
            <Picker.Item label="1 Star" value="1" />
            <Picker.Item label="2 Stars" value="2" />
            <Picker.Item label="3 Stars" value="3" />
            <Picker.Item label="4 Stars" value="4" />
            <Picker.Item label="5 Stars" value="5" />
          </Picker>
          <View style={styles.spaceBetweenInputs} />
          <Button mode="contained" style={styles.button} onPress={filterProductsAndUsers}>
            Apply Filter
          </Button>
        </Card.Content>
      </Card>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    flex: 1,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    elevation: 3,
    padding: 20,
    borderRadius: 15,
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
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
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
    marginBottom: 10, // Reduced margin bottom
  },
  filterInput: {
    backgroundColor: '#fff',
    borderColor: '#dba617',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10, // Reduced margin bottom
    paddingHorizontal: 10,
    height: 50,
  },
  button: {
    backgroundColor: '#dba617',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10, // Reduced top margin
  },
  spaceBetweenInputs: {
    marginVertical: 5, // Reduced vertical margin
  },
  productCard: {
    marginBottom: 10,
    width: '100%',
  },
});
export default AdvancedFilter;
