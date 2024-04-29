import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Start from '../components/start';
import UserProfile from '../components/UserProfile'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Start" component={Start} />
        <Tab.Screen name="UserProfile" component={UserProfile} />
        {/* <Tab.Screen name="UserProfile2" component={UserProfile} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}