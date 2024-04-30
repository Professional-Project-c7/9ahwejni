import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUser from '../components/SignUser'; 
import SignCofee from '../components/SignCofee';
import Login from '../components/Login';
import SignACC from '../components/Signacc';
import Start from '../components/start';
import ProductList from '../components/ProductList';
import Start2 from '../components/Start2';
import Start3 from '../components/start3';
import Start4 from '../components/start4';
import UserProfile from '../components/UserProfile';
import HomePage from '../components/homepage';

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
        <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />

        <Stack.Screen name="homePage" component={HomePage} options={{ headerShown: false }} />


        <Stack.Screen name="st2" component={Start2} options={{ headerShown: false }} />
        <Stack.Screen name="st3" component={Start3} options={{ headerShown: false }} />
        <Stack.Screen name="st4" component={Start4} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NAVSTART;
