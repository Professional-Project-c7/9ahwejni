import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Searchbar, List, Avatar, IconButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { ipAdress } from '../config';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default function CustomSearchBar({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchProductsAndReviews = async () => {
      try {
        const productsResponse = await axios.get(`http://${ipAdress}:3000/api/product`);
        const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/review`);

        const productsWithReviews = productsResponse.data.map((product) => {
          const productReviews = reviewsResponse.data.filter((review) => review.ProductId === product.id);
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

        setAllProducts(productsWithReviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductsAndReviews();
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
      setDropdownVisible(query.length > 0);
    }, 300),
    [allProducts]
  );

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Product selected', item)}>
      <List.Item
        title={item.name}
        description={`(${item.totalReviews} ratings) Average: ${item.averageRating}, Price: $${item.price}`}
        left={() =>
          item.imgUrl ? (
            <Avatar.Image size={54} source={{ uri: item.imgUrl }} />
          ) : (
            <Avatar.Icon size={55} icon="folder" />
          )
        }
        style={styles.dropdownItem}
      />
    </TouchableOpacity>
  );

  const handleSearchButtonPress = () => {
    console.log('Search button pressed', searchQuery);
    debouncedSearch(searchQuery);
  };

  const handleFilterButtonPress = () => {
    navigation.navigate('AdvancedFilter');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <TouchableOpacity style={styles.searchButtonContainer} onPress={handleSearchButtonPress}>
          <LinearGradient
            colors={['rgba(253,190,29,1)', 'rgba(252,145,69,1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.searchButton}
          >
            <IconButton icon="magnify" color="white" size={24} />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButtonContainer} >
          <LinearGradient
            colors={['rgba(253,190,29,1)', 'rgba(252,145,69,1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.filterButton}
          >
            <IconButton icon="filter-variant" color="white" size={24} />
          </LinearGradient>
        </TouchableOpacity >
      </View>
      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderDropdownItem}
            style={styles.dropdownList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchbar: {
    flex: 1,
    marginBottom: 8,
    height: 48,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: 0,
  },
  searchButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 5, // Add spacing between buttons
  },
  searchButton: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 0.9,
    borderColor: 'white',
  },
  filterButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 5, // Add spacing between buttons
  },
  filterButton: {
    borderRadius: 25,
    height: 50,
    width: 50,
    borderWidth: 0.9,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 200,
    overflow: 'hidden',
  },
  dropdownList: {
    paddingHorizontal: 8,
  },
  dropdownItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
  },
});
