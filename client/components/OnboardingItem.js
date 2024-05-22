import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <FastImage
        source={item.image}
        style={[styles.image, { width, resizeMode: 'contain' }]}
      />
      <View style={{ flex: 0.4 }}>  
        <Text style={styles.title}> {item.title} </Text>
        <Text style={styles.description}> {item.description} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,  
  },
  image: {
    flex: 0.4, 
    marginBottom: 20, 
  },
  description: {
    fontSize: 17,
    fontWeight: '500',
    color: '#322C2B',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
});

export default OnboardingItem;
