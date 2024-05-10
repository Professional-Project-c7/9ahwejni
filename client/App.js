import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import NAVSTART from './screens/Navigation';
import ProductPacksList from './components/ProductPacksList';
import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AllCoffeShops from './components/AllCoffeShops';
import HomePage from './components/homepage';
import SellerPage from './components/SellerPage';
import Paye from './components/Payment';
import PaymentCardsDetails from './components/paymentcardsdetailsCoffee';
import ProductDetailsPage from './components/ProdDetails';
import Onboarding from './components/Onboarding';
import NotificationTest from './components/NotificationTest';
function App() {

  return (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
    <NAVSTART  />
 </SafeAreaView>
 </Provider>
  );
}
export default App;