import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import for createBottomTabNavigator
import SignUser from '../components/SignUser';
import SignCofee from '../components/SignCofee';
import Login from '../components/Login';
import SignACC from '../components/Signacc';
import Start from '../components/start';
import UserProfile from '../components/UserProfile'; // Import for UserProfile

const Stack = createNativeStackNavigator();
 // Moved Tab creation outside of Wlc component

 function NAVSTART() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserSignUp" component={SignUser} />
        <Stack.Screen name="CoffeeShopSignUp" component={SignCofee} />
        <Stack.Screen name="SignACC" component={SignACC} />
        {/* <Stack.Screen name="Wlc" component={Wlc} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default NAVSTART