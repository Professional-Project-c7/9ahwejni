import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ImageBackground, ActivityIndicator } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import   Home from './components/tes'
import ProductList from './components/ProductList'
function App() {
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProductList />
    </SafeAreaView>
  );
}



export default App;
