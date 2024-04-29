import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUser from '../components/SignUser'; // Corrected import
import SignCofee from '../components/SignCofee';
import Login from '../components/Login';
import SignACC from '../components/Signacc';
import Start from '../components/start';
const Stack = createNativeStackNavigator();

function NAVSTART() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Start" component={Start}  options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="UserSignUp" component={SignUser} options={{ headerShown: false }} />
        <Stack.Screen name="CoffeeShopSignUp" component={SignCofee} options={{ headerShown: false }} />
        <Stack.Screen name="UserAccount" component={SignACC} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NAVSTART;
