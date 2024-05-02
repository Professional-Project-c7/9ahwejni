import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './components/UserProfile';
import HomePage from './components/homepage';
import Chat from './components/chat';
import ProductDetailsPage from './components/ProdDetails';
import SellerPage from './components/SellerPage';


function App() {
   
  console.log(process.env.ipAdress);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    
    <NAVSTART/>
{/* <SellerPage/> */}
    </SafeAreaView>
  );
}



export default App;



