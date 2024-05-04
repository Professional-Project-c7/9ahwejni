import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TransactionScreenCoffee = () => {
  return (
    <TouchableOpacity >
      <View style={styles.container}>
        <Text style={styles.title}>Transaction Screen Coffee</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dba617',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default TransactionScreenCoffee
