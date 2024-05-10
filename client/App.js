import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import ProductPacksList from './components/ProductPacksList';
import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AllCoffeShops from './components/UserProfile';
import HomePage from './components/homepage';
import AdvancedFilter from './components/AdvancedFilter';
import TestCloudinary from "./components/testcloudinary"

function App() {

  return (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>

   
    <NAVSTART/>

 </SafeAreaView>
 </Provider>
  );
}
export default App;