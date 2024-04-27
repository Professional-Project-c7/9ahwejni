<<<<<<< HEAD
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import test from '../components/start.js'
// import user from '../components/UserProfile.js'

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
    
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={test} options={{headerShown:false}} />
//         <Tab.Screen name="cofe Shope" component={test} options={{headerShown:false}} />
//         <Tab.Screen name="Notification" component={user} options={{headerShown:false}} />
//         <Tab.Screen name="profile" component={user} options={{headerShown:false}}  />
//         {/* <Tab.Screen name="user4" component={user} />
//         <Tab.Screen name="user5" component={user} />
//         <Tab.Screen name="user6" component={user} /> */}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
=======
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUser from '../components/SignUser'; // Corrected import
import SignCofee from '../components/SignCofee';
import Login from '../components/Login';
import SignACC from '../components/Signacc';
import Start from '../components/start';
const Stack = createNativeStackNavigator();

function NAV() {
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

export default NAV;
>>>>>>> 30f029b10d09f44c29a3233cfb5a50957d4e6f49
