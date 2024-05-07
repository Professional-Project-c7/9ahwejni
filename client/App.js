import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';




import NAVSTART from './screens/Navigation';



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