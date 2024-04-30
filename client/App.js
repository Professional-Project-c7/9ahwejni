import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import CoffeeShopsList from './components/AllCoffeShops';

function App() {
   

  return (
    <SafeAreaView style={{ flex: 1 }}>
    {/* <NAVSTART/> */}
   <CoffeeShopsList/>
    </SafeAreaView>
  );
}



export default App;
