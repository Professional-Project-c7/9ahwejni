import React, { useState, useEffect } from 'react';
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ImageBackground, ActivityIndicator } from 'react-native';
import { View, Text, TextInput,SafeAreaView, StyleSheet,ScrollView, Image } from 'react-native';
import { IconButton ,Button} from 'react-native-paper';
import Profile from './components/start';
import NAV from './screens/Navigation';


function App() {
   

  return (
    <SafeAreaView style={{ flex: 1 }}>
    
      <NAV/>
    </SafeAreaView>
  );
}



export default App;
