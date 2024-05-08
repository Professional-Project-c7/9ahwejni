import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryBar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    { key: 'coffee', image: require('../image/coffee-nice.png'), label: 'Coffees' },
    { key: 'drink', image: require('../image/melon-juice.png'), label: 'Drinks' },
    { key: 'cake', image: require('../image/best-cake.png'), label: 'Cakes' },
    { key: 'pack', image: require('../image/take-away.png'), label: 'Packs' }
  ];

  const handlePress = (key) => {
    setSelectedCategory(key);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.key}
          style={styles.categoryItem}
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
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 45,
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
});

export default CategoryBar;