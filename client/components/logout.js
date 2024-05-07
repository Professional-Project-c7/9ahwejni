// import React, { useState } from 'react'
// import { StyleSheet, Text,TouchableOpacity, View,TextInput, ScrollView, Image, FlatList } from 'react-native'
// import { IconButton } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// export default Logout = () => {
//     const navigation = useNavigation();
 
//   const removeTokenFromStorage = async () => {
//     try {
//       await AsyncStorage.removeItem('userToken');
//       console.log('Token removed successfully');
//     } catch (error) {
//       console.error('Error removing token:', error);
//     }
//   };
  
//   const handleLogout = () => {
//     removeTokenFromStorage();
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={{ flex: 1 }}>
      
//     <IconButton  icon="close" onPress={handleLogout}   />
// </View>

//   )
// }

