import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryBar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [temporarySelectedCategory, setTemporarySelectedCategory] = useState(null);
  const categories = [
    { key: 'coffee', image: require('../image/coffee-cup.png'), label: 'Coffees' },
    { key: 'drink', image: require('../image/drink.png'), label: 'Drinks' },
    { key: 'cake', image: require('../image/cake.png'), label: 'Cakes' },
    { key: 'pack', image: require('../image/take-away.png'), label: 'Packs' }
  ];

  const handlePress = (key) => {
    setSelectedCategory(key);
    setTemporarySelectedCategory(key);

    setTimeout(() => {
      setTemporarySelectedCategory(null);
    }, 1000);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.key}
          style={[
            styles.categoryItem,
            selectedCategory === category.key && styles.selectedCategory,
            temporarySelectedCategory === category.key && styles.selectedCategoryTemp,
          ]}
          onPress={() => handlePress(category.key)}
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
    left: 41,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 45, // Increased spacing between categories
    right: 22,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 18,
    color: '#000',
  },
  selectedCategory: {
    backgroundColor: '#dba617',
    borderRadius: 35,
    padding: 10,
  },
  selectedCategoryTemp: {
    backgroundColor: '#dba617',
    borderRadius: 35,
    padding: 10,
  },
});

export default CategoryBar;
