import React, { useState, useEffect } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';

import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SellerPage from './components/SellerPage';
import Paye from './components/Payment';

function App() {
   
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
    
    <NAVSTART/>

    </SafeAreaView>
  ); 
}



export default App;


