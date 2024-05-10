import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import { Text, Button, Divider, Card, List, Avatar, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { ipAdress } from '../config';
import axios from 'axios';

const AdvancedFilter = () => {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/product/`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = () => {
    let filteredProductsList = products;

    if (selectedCategories.length > 0 && !selectedCategories.includes('')) {
      filteredProductsList = filteredProductsList.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (minPrice) {
      filteredProductsList = filteredProductsList.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filteredProductsList = filteredProductsList.filter(
        (product) => product.price <= parseFloat(maxPrice)
      );
    }

    if (rating) {
      filteredProductsList = filteredProductsList.filter(
        (product) => product.rating >= parseFloat(rating)
      );
    }

    setFilteredProducts(filteredProductsList);
    setResultsModalVisible(true);
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
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((category) => category !== value)
        : [...prevSelected, value]
    );
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

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Product selected', item)}>
      <List.Item
        title={item.name}
        description={`(${item.totalReviews || 0} ratings) Average: ${item.rating || 0}, Price: $${item.price}`}
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
          <Button mode="contained" style={styles.button} onPress={filterProducts}>
            Apply Filter
          </Button>
        </Card.Content>
      </Card>
      <Modal
        visible={resultsModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setResultsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtered Results</Text>
              <IconButton
                icon="close"
                onPress={() => setResultsModalVisible(false)}
                size={24}
                style={styles.closeButton}
              />
            </View>
            <FlatList
              data={filteredProducts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderDropdownItem}
              style={styles.dropdownList}
              showsVerticalScrollIndicator
            />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: -10,
  },
});

export default AdvancedFilter;
