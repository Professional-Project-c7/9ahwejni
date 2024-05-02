import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './components/UserProfile';
import HomePage from './components/homepage';

function App() {
   
  console.log(process.env.ipAdress);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    
    <NAVSTART/>

    </SafeAreaView>
  );
}



export default App;



