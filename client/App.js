import React, { useState, useEffect } from 'react';
import {    TouchableOpacity, useColorScheme,  ImageBackground, ActivityIndicator } from 'react-native';
import { View, Text, TextInput,SafeAreaView, StyleSheet,ScrollView, Image } from 'react-native';
import { IconButton ,Button} from 'react-native-paper';
// import Profile from './components/start';
import NAV from './screens/Navigation';


function App() {
   

  return (
    <SafeAreaView style={{ flex: 1 }}>
    
      <NAV/>
    </SafeAreaView>
  );
}



export default App;



// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/Navigation';
// import DetailsScreen from './pages/start';
// // import { View } from 'react-native-reanimated/lib/typescript/Animated';
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ImageBackground, ActivityIndicator } from 'react-native';
// import Login from './pages/Login';
// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={DetailsScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//         <Stack.Screen name="login" component={Login} />

//       </Stack.Navigator>
//     </NavigationContainer>
   
//   );
// }

// export default App;

