import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import ProductPacksList from './components//ProductPacksList';
import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Map from './components/MapCoffe';
import HomePage from './components/homepage';
import AdvancedFilter from './components/AdvancedFilter';
function App() {

  console.log(process.env.ipAdress);
 return (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>

    <HomePage />

 </SafeAreaView>
 </Provider>
  );
}
export default App;