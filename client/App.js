import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import MapCoffe from './components/MapCoffe';
import Chat from './components/chat';

function App() {
   
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Chat/> */}
    <NAVSTART/>
   
    </SafeAreaView>
  );
}



export default App;
