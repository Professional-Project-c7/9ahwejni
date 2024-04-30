import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
// import NAVSTART from './screens/Navigation';
import Start2 from './components/Start2';
import HomePage from "./components/homepage"
import Pub from "./components/pub"
import RandomProducts from "./components/randomproducts"
function App() {
   

  return (
    <SafeAreaView style={{ flex: 1 }}>
    {/* <NAVSTART/> */}
    <HomePage/>
    </SafeAreaView>
  );
}



export default App;
