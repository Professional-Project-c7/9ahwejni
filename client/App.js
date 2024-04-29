import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
// import ProductList from './components/ProductList'; 

function App() {
   

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <NAVSTART/>
      {/* <ProductList/> */}
    </SafeAreaView>
  );
}



export default App;
