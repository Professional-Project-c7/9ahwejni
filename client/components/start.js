import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet,  Text, TouchableOpacity, useColorScheme, View, ImageBackground,Button, ActivityIndicator } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';

import { RefreshControl } from "react-native";

  

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

function Section({ title }) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
}

function Start({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);

  // Simulating a loading delay
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the timeout as needed
  }, []);
  const useNavigation = () => {
    navigation.navigate('UserProfile'); 
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
       source={require('../image/logo.png')}
        style={styles.backgroundImage}>
        {/* Your content goes here */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#c1a01d" />
          </View>
        ) : (
          <TouchableOpacity style={styles.button}   onPress={() => navigation.navigate('login')}>
            <Text style={styles.buttonText}> Get </Text> 
          </TouchableOpacity>
        )}
      </ImageBackground>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black'
  },
  button: {
    width: 200, // Example width (adjust as needed)
    height: 50, // Example height (adjust as needed)
    borderRadius: 30, // Half of the width/height to create a circle
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 520,
    backgroundColor: '#B08149',
  },

  buttonText: {
    backgroundColor: '#B08149', 
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 520,

  },
});

export default Start;






