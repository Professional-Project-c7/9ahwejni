import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView, FlatList, StatusBar,Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import MenuItems from '../components/menuitems';
import HomePage from '../components/homepage';
import AllCofe from '../components/AllCoffeShops'
import AddPacks from '../components/addpacks';
import AddProducts from '../components/addproducts';
import coffeeprofile from "../components/coffeeprofile" 
import Orders from '../components/orders';
import TransactionScreenCoffee from '../components/transactionScreenCoffe';
import ReviewsCoffee from '../components/ReviewsCoffee';
import PaymentCardsDetails from '../components/paymentcardsdetailsCoffee';
import EditCoffee from '../components/editCoffee';
import InfoCoffee from '../components/informationsCoffee';
import Map from '../components/MapCoffe'
// import logout from '../components/logout';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { IconButton } from 'react-native-paper';


function NAVSTART() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="UserSignUp" component={SignUser} options={{ headerShown: false }} />
        <Stack.Screen name="CoffeeShopSignUp" component={SignCofee} options={{ headerShown: false }} />
        <Stack.Screen name="UserAccount" component={SignACC} options={{ headerShown: false }} />
        <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
        <Stack.Screen name="AddPacks" component={AddPacks} ptions={{ headerShown: false }} />
        <Stack.Screen name="AddProducts" component={AddProducts} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={Orders} ptions={{ headerShown: false }} />
        <Stack.Screen name="EditCoffee" component={EditCoffee} ptions={{ headerShown: false }} />
        <Stack.Screen name="InfoCoffee" component={InfoCoffee} ptions={{ headerShown: false }} />
        <Stack.Screen name="TransactionScreenCoffee" component={TransactionScreenCoffee} ptions={{ headerShown: false }} />
        <Stack.Screen name="ReviewsCoffee" component={ReviewsCoffee} ptions={{ headerShown: false }} />
        <Stack.Screen name="PaymentCardsDetails" component={PaymentCardsDetails} ptions={{ headerShown: false }} />
        <Stack.Screen name="User" component={UserProfile} />
        
        <Stack.Screen name="menu" component={MenuItems} options={{ headerShown: false }} />
        <Stack.Screen name="coffeeProfile" component={coffeeprofile} options={{ headerShown: false }} />
        <Stack.Screen name="st2" component={Start2} options={{ headerShown: false }} />
        <Stack.Screen name="st3" component={Start3} options={{ headerShown: false }} />
        <Stack.Screen name="st4" component={Start4} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        
        {/* <Stack.Screen name="logout" component={logout} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#dba617',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen
      name="homePage"
      component={HomePage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <IconButton icon="home" size={size} iconColor={color} />
        ),
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color: focused ? '#dba617' : 'gray' }}>Home</Text>
        ),
        headerShown: false 
      }}
    />
    <Tab.Screen
      name="Map"
      component={Map}
      options={{
        tabBarIcon: ({ color, size }) => (
          <IconButton icon="google-maps" size={size} iconColor={color} />
        ),
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color: focused ? '#dba617' : 'gray' }}>Map</Text>
        ),
        headerShown: false 
      }}
    />
    <Tab.Screen
      name="UserProfile"
      component={UserProfile}
      options={{
        tabBarIcon: ({ color, size }) => (
          <IconButton icon="account" size={size} iconColor={color} />
        ),
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color: focused ? '#dba617' : 'gray' }}>Profile</Text>
        ),
        headerShown: false 
      }}
      
    />
  </Tab.Navigator>
  );
}

export default NAVSTART;
