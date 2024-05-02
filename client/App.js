import React, { useState, useEffect } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';


function App() {
  //  
  console.log(process.env.ipAdress);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    
    <NAVSTART/>
   
    </SafeAreaView>
  ); 
}



export default App;
