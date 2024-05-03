import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import MapCoffe from './components/MapCoffe';
import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Start4 from './components/start4';
import MyComponent from './components/ProductPacksList';
function App() {
  
  console.log(process.env.ipAdress);
 return (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
    <NAVSTART />
 </SafeAreaView>
 </Provider>
  );
}
export default App;
