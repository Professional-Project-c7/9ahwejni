import React, { useState, useEffect } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
// import MapCoffe from './components/MapCoffe';
// import Chat from './components/chat';
import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  //  
  console.log(process.env.ipAdress);
  return (
    <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Chat/> */}
    <ProductList/>
   
    </SafeAreaView>
     </Provider>
  ); 
}
export default App;