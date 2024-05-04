import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
// import MapCoffe from './components/MapCoffe';
import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AllCoffeShops from './components/AllCoffeShops';
import HomePage from './components/homepage';
function App() {
  console.log(process.env.ipAdress);
  
 return (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
    <ProductList />
 </SafeAreaView>
 </Provider>
  );
}
export default App;
