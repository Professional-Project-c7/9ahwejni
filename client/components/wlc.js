// // import * as React from 'react';
// // import { Text, View } from 'react-native';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import Start from './start';
// // import UserProfile from './UserProfile'


// // const Tab = createBottomTabNavigator();

// // export default function Wlc() {
// //   return (
// //     <NavigationContainer>
// //       <Tab.Navigator>
// //         <Tab.Screen name="Start" component={Start} />
// //         {/* <Tab.Screen name="UserProfile" component={UserProfile} /> */}
// //         {/* <Tab.Screen name="UserProfile2" component={UserProfile} /> */}
// //       </Tab.Navigator>
// //     </NavigationContainer>
// //   );
// // }



// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }