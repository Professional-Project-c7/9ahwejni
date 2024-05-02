import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import HomePage from './components/homepage';

function App() {
   
  console.log(process.env.ipAdress);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    
    <HomePage/>

    </SafeAreaView>
  );
}



export default App;



