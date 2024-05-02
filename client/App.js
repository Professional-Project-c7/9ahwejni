import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import HomePage from './components/homepage';
import Chat from './components/chat';
import MapCoffe from './components/MapCoffe';
function App() {
  console.log(process.env.ipAdress);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Chat/> */}
    <MapCoffe/>
  
    </SafeAreaView>
  );
}



export default App;



