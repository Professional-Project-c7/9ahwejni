import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
// import NAVSTART from './screens/Navigation';
import Start2 from './components/Start2';
import MapCoffe from './components/MapCoffe';

function App() {
   

  return (
    <SafeAreaView style={{ flex: 1 }}>
    {/* <NAVSTART/> */}
    <MapCoffe/>
    </SafeAreaView>
  );
}



export default App;
