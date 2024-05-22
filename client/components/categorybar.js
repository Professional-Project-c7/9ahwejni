import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryBar = () => {
  const navigation = useNavigation();
  const categories = [
    { key: 'coffee', image: require('../image/coffee-nice.png'), label: 'Coffees', screen: 'AllCoffees' },
    { key: 'drink', image: require('../image/orange-juice.png'), label: 'Drinks', screen: 'AllDrinks' },
    { key: 'cake', image: require('../image/cakes.png'), label: 'Cakes', screen: 'AllCakes' },
    { key: 'pack', image: require('../image/packos.png'), label: 'Packs', screen: 'Allpack' }
  ];

  const handlePress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.key}
          style={styles.categoryItem}
          onPress={() => handlePress(category.screen)}
        >
          <Image source={category.image} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{category.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 50,
  },
  categoryImage: {
    width: 52,
    height: 52,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 18,
    color: '#000',
    fontStyle: 'italic'
  },
});

export default CategoryBar;
