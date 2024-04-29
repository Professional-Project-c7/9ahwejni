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
      <Stack.Screen name="Home" component={Start}  />
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserSignUp" component={SignUser} />
        <Stack.Screen name="CoffeeShopSignUp" component={SignCofee} />
        <Stack.Screen name="UserAccount" component={SignACC} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NAVSTART;
