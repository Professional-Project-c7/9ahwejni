import React, { useState, useEffect } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import MapCoffe from './components/MapCoffe';
import Chat from './components/chat';

function App() {
   console.log(process.env.ipAdress);
//  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Chat/> */}
    <NAVSTART/>
   
    </SafeAreaView>
  ); 
}



export default App;
