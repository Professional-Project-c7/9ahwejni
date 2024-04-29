import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUser from '../components/SignUser'; // Corrected import
import SignCofee from '../components/SignCofee';
import Login from '../components/Login';
import SignACC from '../components/Signacc';
import Start from '../components/start';
import UserProfile from '../components/UserProfile'

const Stack = createNativeStackNavigator();

function NAVSTART() {
  return (

    <NavigationContainer>
       <Stack.Navigator>
      <Stack.Screen name="Start" component={Start}   options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserSignUp" component={SignUser} />
        <Stack.Screen name="CoffeeShopSignUp" component={SignCofee} />
        <Stack.Screen name="UserAccount" component={SignACC} />
        <Stack.Screen name="UserProfile" component={SignACC} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NAVSTART;
