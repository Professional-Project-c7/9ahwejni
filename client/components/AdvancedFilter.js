import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button, Divider, Card, List } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useProducts } from '../redux/products/productHooks';
import { ipAdress } from '../config';
import axios from 'axios';

const AdvancedFilter = () => {
  const { products, getProducts, status } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/user/`);
        setUsers(response.data.filter(user => user.UserType === "coffee"));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const toggleSearch = () => {
    setSearchActive(true);
    getProducts(); // Fetch products
    filterProductsAndUsers();
    setTimeout(() => {
      setSearchActive(false);
    }, 500);
  };

  const filterProductsAndUsers = () => {
    let filteredProducts = products;
    let filteredUsers = users;
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      filteredUsers = filteredUsers.filter(user =>
        user.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.LastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
    }
    if (rating) {
      filteredProducts = filteredProducts.filter(product => product.rating >= parseFloat(rating));
    }
    setFilteredProducts(filteredProducts);
    setFilteredUsers(filteredUsers);
    setDropdownVisible(filteredProducts.length > 0 || filteredUsers.length > 0);
  };

  const handleSearchChange = query => {
    setSearchQuery(query);
    filterProductsAndUsers();
  };

  const handleMinPriceChange = price => {
    setMinPrice(price);
    filterProductsAndUsers();
  };

  const handleMaxPriceChange = price => {
    setMaxPrice(price);
    filterProductsAndUsers();
  };

  const handleRatingChange = value => {
    setRating(value);
    filterProductsAndUsers();
  };

  const handleCategoryChange = value => {
    setCategory(value);
    filterProductsAndUsers();
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log(`Selected: ${item.name || item.FirstName} ${item.LastName || ""}`)}>
      <List.Item 
        title={item.name || `${item.FirstName} ${item.LastName}`}
        description={item.description || ""}
        style={styles.dropdownItem}
      />
      <Divider />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Advanced Filter" titleStyle={styles.cardTitle} />
        <Card.Content>
          <View style={styles.asembler}>
            <View style={styles.Main}>
              <TextInput 
                placeholder="Search ..."
                style={styles.Input}
                value={searchQuery}
                onChangeText={handleSearchChange}
              />
            </View>
            <Icon
              name="magnify"
              color={searchActive ? '#dba617' : '#FFF'}
              size={33}
              style={[styles.searchIcon, searchActive ? styles.active : styles.inactive]}
              onPress={toggleSearch}
            />
          </View>
          {dropdownVisible && (
            <FlatList
              data={[...filteredProducts, ...filteredUsers]}
              renderItem={renderDropdownItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.dropdown}
            />
          )}

          <Divider style={styles.divider} />
          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={handleCategoryChange}
          >
            <Picker.Item label="Please select a category" value="" />
            <Picker.Item label="Coffee" value="coffee" />
            <Picker.Item label="Juice" value="drinks" />
            <Picker.Item label="Cake" value="cake" />
            <Picker.Item label="Packs" value="packs" />
          </Picker>
          <Text style={styles.label}>Minimum Price</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter minimum price"
            value={minPrice}
            onChangeText={handleMinPriceChange}
            style={styles.filterInput}
          />
          <Text style={styles.label}>Maximum Price</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter maximum price"
            value={maxPrice}
            onChangeText={handleMaxPriceChange}
            style={styles.filterInput}
          />
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
          <Button mode="contained" style={styles.button} onPress={() => console.log(filteredProducts)}>
            Apply Filter
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    color: '#dba617',
  },
  asembler: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Main: {
    backgroundColor: '#FFF',
    width: 270,
    height: 50,
    borderWidth: 2,
    borderColor: '#dba617',
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
  Input: {
    marginLeft: 10,
    marginTop: 3,
    flex: 1,
  },
  searchIcon: {
    backgroundColor: '#dba617',
    borderWidth: 1,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderColor: '#dba617',
    padding: 8,
  },
  active: {
    backgroundColor: '#FFF',
  },
  inactive: {
    backgroundColor: '#dba617',
  },
  divider: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#dba617',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterInput: {
    backgroundColor: '#fff',
    borderColor: '#dba617',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#dba617',
  },
  dropdown: {
    maxHeight: 150,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 3,
    marginBottom: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default AdvancedFilter;