import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

function OnboardingItem({ item }) {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <FastImage
        source={item.image}
        style={[styles.image, { width: width * 0.8, height: height * 0.4 }]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    marginVertical: 20,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  description: {
    fontSize: 19,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',

  },
});

export default OnboardingItem;
