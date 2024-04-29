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
      <Stack.Screen name="iheb" component={Start} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserSignUp" component={SignUser} />
        <Stack.Screen name="CoffeeShopSignUp" component={SignCofee} />
        <Stack.Screen name="UserAccount" component={SignACC} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NAV;



// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import test from '../pages/start.js'
// import user from '../pages/UserProfile.js'

// const Tab = createBottomTabNavigator();

// export default function Home() {
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




// import React, {useCallback} from 'react';
// import {Button, Linking, StyleSheet, View} from 'react-native'; 

// const OpenSettingsButton = ({children}) => {
//   const handlePress = useCallback(async () => {
//     // Open the custom settings if the app has one
//     await Linking.openURL(url='../pages/Login');
//   }, []);

//   return <Button title={children} onPress={handlePress} />;
// };

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <OpenSettingsButton>Open </OpenSettingsButton>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;




// HomeScreen.js
// import React from 'react';
// import { View, Text, Button } from 'react-native';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// export default HomeScreen;



