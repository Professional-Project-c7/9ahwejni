import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
// import MapCoffe from './components/MapCoffe';
import HomePage from './components/homepage';
import MenuItems from './components/menuitems';
import ProductList from './components/ProductList';
=======
import { LogBox, SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import MapCoffe from './components/MapCoffe';
import Chat from './components/chat';

>>>>>>> 66406eebe27a6192a0ec680c265df153de7f16cf
function App() {
  //  
  console.log(process.env.ipAdress);
  return (
    <SafeAreaView style={{ flex: 1 }}>
<<<<<<< HEAD
    
    <NAVSTART/>

=======
      {/* <Chat/> */}
    <NAVSTART/>
   
>>>>>>> 66406eebe27a6192a0ec680c265df153de7f16cf
    </SafeAreaView>
  ); 
}



export default App;
