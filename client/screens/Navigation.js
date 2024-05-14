import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';

// Import your components
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
import Map from '../components/MapCoffe';
import AddPacks from '../components/addpacks';
import AddProducts from '../components/addproducts';
import coffeeprofile from '../components/coffeeprofile';
import Orders from '../components/orders';
import TransactionScreenCoffee from '../components/transactionScreenCoffe';
import ReviewsCoffee from '../components/ReviewsCoffee';
import PaymentCardsDetails from '../components/paymentcardsdetailsCoffee';
import EditCoffee from '../components/editCoffee';
import InfoCoffee from '../components/informationsCoffee';
import SettingComponent from '../components/Setting';
import Favorit from '../components/Another';
import ProductDetailsPage from '../components/ProdDetails';
import Paye from '../components/Payment';
import Panier from '../components/Panier';
import Allcoffeeshops from '../components/AllCoffeShops';
import Onboarding from '../components/Onboarding';
import AdvancedFilter from '../components/AdvancedFilter';
import Coffeelist from "../components/coffeeprodlist"
import SeeAllProdsCoffee from "../components/seeAllprodscoffee"
import SeeAllPacksCoffee from "../components/seeAllpackscoffee"

import AllProducts from '../components/AllProd';
// import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function TabNavigator() {
  const [userType, setUserType] = useState("");
  // const [x,setx]=useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const storedUserType = await AsyncStorage.getItem('userToken');
            setUserType(JSON.parse(storedUserType));
            console.log("userType",userType);
          
        } catch (error) {
          console.log('Error fetching user type:', error);
        }
      };
      fetchData();
      
    }, []);
  
    const storeUserType = async (type) => {
      try {
        await AsyncStorage.setItem('UserType', type);
      } catch (error) {
        console.log('Error storing user type:', error);
      }
    };
  console.log("hello",userType)
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
        name="Allcoffeeshops"
        component={Allcoffeeshops}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="coffee" size={size} iconColor={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#dba617' : 'gray' }}>Shops</Text>
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
      {userType === 'client' ? (
        <Tab.Screen
          name="User"
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
      ) : userType === 'coffee' ? (
        <Tab.Screen
          name="coffeeProfile"
          component={coffeeprofile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <IconButton icon="coffee" size={size} iconColor={color} />
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? '#dba617' : 'gray' }}>Coffee Profile</Text>
            ),
            headerShown: false
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}
function NAVSTART() {



  
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        {/* <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="UserSignUp" component={SignUser} options={{ headerShown: false }} />
        <Stack.Screen name="CoffeeShopSignUp" component={SignCofee} options={{ headerShown: false }} />
        <Stack.Screen name="UserAccount" component={SignACC} options={{ headerShown: false }} />
        <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
        <Stack.Screen name="AddPacks" component={AddPacks} options={{ headerShown: false }} />
        <Stack.Screen name="AddProducts" component={AddProducts} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
        <Stack.Screen name="Edit" component={EditCoffee} />
        <Stack.Screen name="Info" component={InfoCoffee} />
        <Stack.Screen name="Coffeelist" component={Coffeelist} />
        <Stack.Screen
          name="TransactionScreenCoffee"
          component={TransactionScreenCoffee}
         
        />
         <Stack.Screen name="SeeAllPacksCoffee" component={SeeAllPacksCoffee} options={{ headerShown: false }} />
        <Stack.Screen name="ReviewsCoffee" component={ReviewsCoffee} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentCardsDetails" component={PaymentCardsDetails} options={{ headerShown: false }} />
        <Stack.Screen name="User" component={UserProfile} />
        <Stack.Screen name="prd" component={ProductDetailsPage} options={{ headerShown: false }} />
        <Stack.Screen name="panier" component={Panier} options={{ headerShown: false }} />
        <Stack.Screen name="Allcoffeeshops" component={Allcoffeeshops} options={{ headerShown: false }} />
        <Stack.Screen name="Paye" component={Paye} options={{ headerShown: false }} />
        <Stack.Screen name="menu" component={MenuItems} options={{ headerShown: false }} />
        <Stack.Screen name="coffeeProfile" component={coffeeprofile} options={{ headerShown: false }} />
        <Stack.Screen name="st2" component={Start2} options={{ headerShown: false }} />
        <Stack.Screen name="st3" component={Start3} options={{ headerShown: false }} />
        <Stack.Screen name="st4" component={Start4} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs"  component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="AdvancedFilter" component={AdvancedFilter} options={{ headerShown: false }} />
        <Stack.Screen name="Favorit" component={Favorit}  />
        <Stack.Screen  name="SeeAllProdsCoffee" component={SeeAllProdsCoffee} />
        <Stack.Screen name="AllProducts" component={AllProducts} options={{ headerShown: false }} />

        <Stack.Screen  name="SettingComponent" component={SettingComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NAVSTART;