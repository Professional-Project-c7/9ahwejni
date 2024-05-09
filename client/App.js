import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import Start from './components/Start2';
import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CoffeeShopsList from './components/AllCoffeShops';
import HomePage from './components/homepage';
import SellerPage from './components/SellerPage';
import Paye from './components/Payment';
import PaymentCardsDetails from './components/paymentcardsdetailsCoffee';
import ProductDetailsPage from './components/ProdDetails';
import Onboarding from './components/Onboarding';

function App() {


 return (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
    <Onboarding />
 </SafeAreaView>
 </Provider>
  );
}
export default App;