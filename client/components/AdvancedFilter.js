import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  PanResponder,
} from 'react-native';
import { Text, Button, Divider, Card, List, Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AdvancedFilter = () => {
  const [products, setProducts] = useState([]);

  const [priceRange, setPriceRange] = useState([0, 100]);

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
        const packsResponse = await axios.get(`http://${ipAdress}:3000/api/packs`);
        const packReviewsResponse = await axios.get(`http://${ipAdress}:3000/api/packreview`);

        const productsWithReviews = [...productsResponse.data, ...packsResponse.data].map(product => {
          const productReviews = reviewsResponse.data.concat(packReviewsResponse.data).filter(review => review.prodId === product.id || review.PackId === product.id);
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
    const [minPrice, maxPrice] = priceRange;
    let filteredProductsList = products.filter(product => {
      return (!selectedCategories.length || selectedCategories.includes(product.category)) &&
        (product.price >= minPrice) &&
        (product.price <= maxPrice) &&
        (!rating || product.averageRating >= parseFloat(rating));
    });

    setFilteredProducts(filteredProductsList);
    setResultsModalVisible(true);
  };

  const handleCategorySelect = async (value) => {
    if (value === '') {
      // Select all categories
      const allCategories = categories.map(category => category.value).filter(v => v);
      setSelectedCategories(allCategories);
      return;
    }

    setSelectedCategories((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((category) => category !== value)
        : [...prevSelected, value]
    );
  };

  const handleNavigateToDetails = async (item) => {
    try {
      await AsyncStorage.setItem('selectedProductId', item.id.toString());
      navigation.navigate('prd', { item });
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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          navigation.navigate('homePage');
        }
      },
    })
  ).current;

  return (
    <View style={styles.fullScreenCard} {...panResponder.panHandlers}>
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
        <Text style={styles.label}>Price Range</Text>
        <Text style={styles.sliderLabel}>{`$${priceRange[0]} - $${priceRange[1]}`}</Text>
        <MultiSlider
          values={[priceRange[0], priceRange[1]]}
          sliderLength={350}
          onValuesChange={(values) => setPriceRange(values)}
          min={0}
          max={100}
          step={1}
          selectedStyle={{ backgroundColor: '#dba617' }}
          unselectedStyle={{ backgroundColor: '#e0e0e0' }}
          markerStyle={{ backgroundColor: '#dba617' }}
        />
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
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setResultsModalVisible(false)}
            >
              <Icon name="close" size={24} color="#dba617" />
            </TouchableOpacity>
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
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 26,
    color: '#dba617',
    fontStyle: 'italic',
  },
  divider: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontStyle: 'italic',
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
    backgroundColor: '#A9A9A6',
  },
  categoryText: {
    fontSize: 19,
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#dba617',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 5, // removed bottom margin
    top:40
  },
  button: {
    backgroundColor: '#dba617',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: 77,
  },
  spaceBetweenInputs: {
    marginVertical: 0, // removed top margin
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
  closeIconContainer: {
    alignSelf: 'flex-end',
  },
  sliderLabel: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default AdvancedFilter;
