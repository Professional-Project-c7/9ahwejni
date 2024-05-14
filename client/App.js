import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';



import NAVSTRAT from './screens/Navigation';
import ProductPacksList from './components/ProductPacksList';
import ProductList from './components/ProductList';
import AllCoffeShops from './components/AllCoffeShops';
import   User from './components/UserProfile'
import HomePage from './components/homepage';
import SellerPage from './components/SellerPage';
import PaymentScreen from './components/Payment';
import PaymentCardsDetails from './components/paymentcardsdetailsCoffee';
import ProductDetailsPage from './components/ProdDetails';
import Onboarding from './components/Onboarding';
import AdvancedFilter from './components/AdvancedFilter';
import CheckOutForm from './components/ss';
import ShoppingCart from './components/ss';
import AllProd from './components/AllProd';

function App() {

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
          <PaymentScreen  />
   </SafeAreaView>
   </Provider>
    );
  }
  export default App;