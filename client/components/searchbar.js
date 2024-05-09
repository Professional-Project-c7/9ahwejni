import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({ minPrice: '', maxPrice: '', rating: '' });
  const [searchActive, setSearchActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const toggleSearch = () => {
    setSearchActive(true);
    setTimeout(() => {
      setSearchActive(false);
    }, 500);
  };

  const toggleFilter = () => {
    setFilterActive(true);
    setDialogVisible(!dialogVisible);
    setTimeout(() => {
      setFilterActive(false);
    }, 500);
  };

  const handleFilterChange = (key, value) => {
    setFilterOptions({ ...filterOptions, [key]: value });
  };

  const applyFilters = () => {
    // Implement your advanced search logic here
   
    setDialogVisible(false);
  };

  return (
    <View style={styles.asembler}>
      <View style={styles.Main}>
        <TextInput 
          placeholder='Search ...' 
          style={styles.Input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <Icon
        name="magnify"
        color={searchActive ? '#dba617' : '#FFF'}
        size={33}
        style={[styles.searchIcon, searchActive ? styles.active : styles.inactive]}
        onPress={toggleSearch}
      />
      <Icon
        name="filter-variant"
        color={filterActive ? '#dba617' : '#FFF'}
        size={33}
        style={[styles.filterIcon, filterActive ? styles.active : styles.inactive]}
        onPress={toggleFilter}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Advanced Filter</Dialog.Title>
          <Dialog.Content>
            <Text>Min Price:</Text>
            <TextInput 
              style={styles.filterInput} 
              keyboardType="numeric" 
              value={filterOptions.minPrice}
              onChangeText={(value) => handleFilterChange('minPrice', value)}
            />
            <Text>Max Price:</Text>
            <TextInput 
              style={styles.filterInput} 
              keyboardType="numeric" 
              value={filterOptions.maxPrice}
              onChangeText={(value) => handleFilterChange('maxPrice', value)}
            />
            <Text>Rating:</Text>
            <TextInput 
              style={styles.filterInput} 
              keyboardType="numeric" 
              value={filterOptions.rating}
              onChangeText={(value) => handleFilterChange('rating', value)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={applyFilters}>Apply</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  asembler: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
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
  filterIcon: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dba617',
    padding: 8,
    marginLeft: 5,
    backgroundColor: '#dba617',
  },
  active: {
    backgroundColor: '#FFF',
  },
  inactive: {
    backgroundColor: '#dba617',
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#dba617',
    borderRadius: 8,
    padding: 5,
    width: '100%',
    marginBottom: 10,
  },
});
