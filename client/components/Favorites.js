import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const favorites = useSelector(state => Object.values(state.products.favorites));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title style={styles.shopTitle}>My Favorite Coffees</Title>
        {favorites.map((product) => (
          <Card key={product.id} style={styles.productCard}>
            <Card.Content style={styles.productCardContent}>
              <View style={styles.imageContainer}>
                <Image 
                  style={styles.productImage}
                  source={{ uri: product.imgUrl }}
                />
              </View>
              <View style={styles.productInfo}>
                <Title style={styles.productTitle}>{product.title}</Title>
                <Text style={styles.productDescription}>{product.description}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

