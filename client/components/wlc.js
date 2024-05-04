import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView, FlatList, StatusBar,Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from '../components/Login';

import UserProfile from '../components/UserProfile';

const Stack = createNativeStackNavigator();

import { IconButton } from 'react-native-paper';

export default function NAV() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="User" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    );
}
     

        
     
    