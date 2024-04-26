import React, { useState, useEffect } from 'react';
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ImageBackground, ActivityIndicator } from 'react-native';
import { View, Text, TextInput,SafeAreaView, StyleSheet,ScrollView, Image } from 'react-native';
import { IconButton ,Button} from 'react-native-paper';
import Profile from './screens/Navigation';


function App() {
   

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Profile/>  */}
          
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        
   <Button icon="arrow-left"   size={20} textColor='black' onPress={() => navigation.goBack()}>
</Button>
  <Button icon="dots-vertical" size={20} textColor='black' onPress={() => navigation.goBack()}>
  </Button>
</View>
      <Profile/>
    </SafeAreaView>
  );
}



export default App;
