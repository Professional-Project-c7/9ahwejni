import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ImageBackground, ActivityIndicator } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';

import { RefreshControl } from "react-native";




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
    }, 5000); 
  }, []);
  const navigateToUserAccount = () => {
    navigation.navigate('Login'); 
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
          <TouchableOpacity style={styles.button}   onPress={navigateToUserAccount}>
            <Text style={styles.buttonText}> Get started</Text>
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
    
  },
  button: {
  
    alignItems: 'center',
    marginTop: 520,
    width: '50%',
    height: 60,
    backgroundColor: '#dba617',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 5, 
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 520,

  },
});

export default Start;