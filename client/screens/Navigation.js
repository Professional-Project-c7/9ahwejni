import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUser from '../components/SignUser'; 
import SignCofee from '../components/SignCofee';
import Login from '../components/Login';
import SignACC from '../components/Signacc';
import Start from '../components/start';
import AllCoffeShops from '../components/AllCoffeShops';
import MapCoffe from '../components/MapCoffe';
const Stack = createNativeStackNavigator();

function NAV() {
  return (

    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="MapCoffe" component={MapCoffe} />
        <Stack.Screen name="AllCoffeShops" component={AllCoffeShops} />
      <Stack.Screen name="Home" component={Start}  />
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserSignUp" component={SignUser} />
        <Stack.Screen name="CoffeeShopSignUp" component={SignCofee} />
        <Stack.Screen name="UserAccount" component={SignACC} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NAV;
