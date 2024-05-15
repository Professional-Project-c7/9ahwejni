import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../image/success.webp')}
        style={styles.image}
      />
      <Text style={styles.successMessage}>Payment Successful!</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('homePage')}
        color="green" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    marginBottom: 30, // Add margin bottom to separate image from text
  },
  successMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20, // Add margin bottom to separate message from button
  },
});

export default PaymentSuccess;
