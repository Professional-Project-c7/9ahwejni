import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Searchbar, List, Avatar, IconButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { ipAdress } from '../config';

// Debounce utility function
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default function CustomSearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Fetch all "coffee" users, reviews, and products initially
  useEffect(() => {
    const fetchCoffeeUsersReviewsAndProducts = async () => {
      try {
        const usersResponse = await axios.get(`http://${ipAdress}:3000/api/user`);
        const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/review`);
        const productsResponse = await axios.get(`http://${ipAdress}:3000/api/product`);

        // Aggregate reviews and products per user, only for coffee shops
        const coffeeUsersWithDetails = usersResponse.data
          .filter((user) => user.UserType === 'coffee')
          .map((user) => {
            const userReviews = reviewsResponse.data.filter((review) => review.userId === user.id);
            const totalReviews = userReviews.length;
            const averageRating = totalReviews
              ? userReviews.reduce((acc, review) => acc + review.stars, 0) / totalReviews
              : 0;

            const userProducts = productsResponse.data.filter((product) => product.userId === user.id);

            return {
              ...user,
              totalReviews,
              averageRating: averageRating.toFixed(1),
              totalProducts: userProducts.length,
            };
          });

        setAllUsers(coffeeUsersWithDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCoffeeUsersReviewsAndProducts();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = allUsers.filter(
        (user) =>
          user.FirstName.toLowerCase().includes(query.toLowerCase()) ||
          user.LastName.toLowerCase().includes(query.toLowerCase()) ||
          user.UserType.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
      setDropdownVisible(query.length > 0);
    }, 300),
    [allUsers]
  );

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Item selected', item)}>
      <List.Item
        title={`${item.FirstName} ${item.LastName}`}
        description={`(${item.totalReviews} ratings) Average: ${item.averageRating}, Products: ${item.totalProducts}`}
        left={() =>
          item.ImageUrl ? (
            <Avatar.Image size={50} source={{ uri: item.ImageUrl }} />
          ) : (
            <Avatar.Icon size={50} icon="folder" />
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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
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
    marginRight: 0, // Ensure no gap between search bar and button
  },
  searchButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8, // Aligns with the search bar's marginBottom
    
  },
  searchButton: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 12,
    height: 50, // Ensure the button height matches the search bar height
    borderWidth: 0.9,
    borderColor: 'white',
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
