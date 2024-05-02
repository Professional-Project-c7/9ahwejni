// AnotherComponent.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

const AnotherComponent = ({ onClose }) => {
    const handleSave = () => {
        // Handle saving profile details to database or API
        console.log('AnotherComponent!');
      };
  return (
    
    <View style={styles.container}>
      <Text>Hello</Text>
      <TouchableOpacity onPress={onClose} style={styles.button}>
        <Text style={styles.buttonText}>Return to Profile</Text>
      </TouchableOpacity>
      <IconButton icon="close" style={styles.icon} onPress={onClose}   />
      <IconButton icon="camera" style={styles.icon} onPress={handleSave}   />
    </View>
  );
};


const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0066cc',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
};

export default AnotherComponent;
