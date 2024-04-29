import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUser from '../components/SignUser'; // Corrected import
import SignCofee from '../components/SignCofee';
import Login from '../components/Login';
import SignACC from '../components/Signacc';
import Start from '../components/start';
import UserProfile from '../components/UserProfile'

const Tab = createNativeStackNavigator();


function NAVSTART() {
  return (

    <NavigationContainer>
       <Tab.Navigator>
      <Tab.Screen name="Start" component={Start}   options={{ headerShown: false }} />
      <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="UserSignUp" component={SignUser} />
        <Tab.Screen name="CoffeeShopSignUp" component={SignCofee} />
        <Tab.Screen name="UserAccount" component={SignACC} />
        <Tab.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}   />

      </Tab.Navigator>
    </NavigationContainer>

  );
}

export default NAVSTART;

