import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Searchbar, List, Avatar } from 'react-native-paper';
import axios from 'axios';
import { useProducts } from '../redux/products/productHooks';
import { ipAdress } from '../config';

export default function CustomSearchBar() {
  const { products, getProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/user/`);
        setFilteredUsers(response.data.filter(user => user.UserType === 'coffee'));
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
    getProducts();
  }, [getProducts]);

  const onChangeSearch = query => {
    setSearchQuery(query);

    const filteredProductsList = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    const filteredUsersList = filteredUsers.filter(
      user =>
        (user.FirstName.toLowerCase() + ' ' + user.LastName.toLowerCase()).includes(query.toLowerCase())
    );

    setFilteredProducts(filteredProductsList);
    setFilteredUsers(filteredUsersList);

    setDropdownVisible(query.length > 0 && (filteredProductsList.length > 0 || filteredUsersList.length > 0));
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Item selected', item)}>
      <List.Item
        title={item.name || `${item.FirstName} ${item.LastName}`}
        description={item.description || `UserType: ${item.UserType}`}
        left={() =>
          item.imgUrl || item.ImageUrl ? (
            <Avatar.Image size={50} source={{ uri: item.imgUrl || item.ImageUrl }} />
          ) : (
            <Avatar.Icon size={50} icon="folder" />
          )
        }
        style={styles.dropdownItem}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={[...filteredProducts, ...filteredUsers]}
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
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
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
