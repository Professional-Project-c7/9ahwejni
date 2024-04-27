import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import test from '../components/start.js'
import user from '../components/UserProfile.js'
import SignACC from '../components/Signacc.js';
import SignUser from '../components/SignUser.js';
import SignCofee from '../components/SignCofee.js';
import Login from '../components/Login.js';

const Tab = createBottomTabNavigator();

export default function App() {
    // const navigation = useNavigation(); 
  return (
    
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={test} options={{headerShown:false}} />
        <Tab.Screen name="cofe Shope" component={test} options={{headerShown:false}} />
        <Tab.Screen name="Notification" component={user} options={{headerShown:false}} />
        <Tab.Screen name="profile" component={user} options={{headerShown:false}}  />
        <Tab.Screen name="UserAccount" component={SignACC} />
         <Tab.Screen name="UserSignUp" component={SignUser} /> 
        <Tab.Screen name="CoffeeShopSignUp" component={SignCofee} />
        <Tab.Screen name="Login" component={Login} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}