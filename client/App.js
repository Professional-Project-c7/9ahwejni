/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ImageBackground, ActivityIndicator } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import   Home from './components/tes'


function App() {
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Home/>
    </SafeAreaView>
  );
}



export default App;