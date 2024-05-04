import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

export default function SearchBar() {
  const [searchActive, setSearchActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  const toggleSearch = () => {
    setSearchActive(true); // Set active to show the color change
    setTimeout(() => {
      setSearchActive(false); // Revert back after half a second
    }, 500); // 500 milliseconds
  };

  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  return (
    <View style={styles.asembler}>
      <View style={styles.Main}>
        <TextInput placeholder='Search ...' style={styles.Input}></TextInput>
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
  }
});
