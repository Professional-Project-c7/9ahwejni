import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shownotif } from './Notificationn'; // Ensure the path is correct




const TTT = () => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.commandButton} onPress={() => Shownotif('Hello', 'Holla')}>
        <Text style={styles.panelButtonTitle}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 20,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TTT;
