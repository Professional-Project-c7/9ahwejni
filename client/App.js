  import React, { useState, useEffect } from 'react';
  import { SafeAreaView } from 'react-native';
  import { Provider } from 'react-redux';
  import { store } from './redux/store';



  import NAVSTRAT from './screens/Navigation';
  import ProductPacksList from './components/ProductPacksList';
  import ProductList from './components/ProductList';
  import AllCoffeShops from './components/AllCoffeShops';
  import User from './components/UserProfile'
  import HomePage from './components/homepage';
  import SellerPage from './components/SellerPage';
  import Paye from './components/Payment';
  import PaymentCardsDetails from './components/paymentcardsdetailsCoffee';
  import ProductDetailsPage from './components/ProdDetails';
  import Onboarding from './components/Onboarding';
  import AdvancedFilter from './components/AdvancedFilter';
  import CheckOutForm from './components/ss';
  import ShoppingCart from './components/ss';
  import AllProd from './components/AllProd';
  import AllCakes from './components/AllCakes';
  import AllCoffees from './components/AllCoffees';
  import AllDrinks from './components/AllDrinks';
  import Allpack from './components/allpack';
  function App() {

    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
            <NAVSTRAT  />
     </SafeAreaView>
     </Provider>
      );
    }
    export default App;














// import React, { useState } from 'react';
// import styled, { ThemeProvider } from 'styled-components/native';
// import { SafeAreaView, View, Text, Button, useColorScheme } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Modal from 'react-native-modal';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import NAVSTRAT from './screens/Navigation';
// import { color } from '@shopify/restyle';

// const lightTheme = {
//   body: '#FFF',
//   text: '#000',
// };

// const darkTheme = {
//   body: '#000',
//   text: '#FFF',
// };

// const Container = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.body};
// `;

// const ThemedText = styled.Text`
//   color: ${({ theme }) => theme.text};
// `;

// const IconButton = styled.TouchableOpacity`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   padding: 10px;
// `;

// const ModalContent = styled.View`
//   background-color: white;
//   padding: 20px;
//   border-radius: 10px;
// `;

// const App = () => {
//   const systemTheme = useColorScheme();
//   const [theme, setTheme] = useState(systemTheme);
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleTheme = (selectedTheme) => {
//     setTheme(selectedTheme);
//     setModalVisible(false);
//   };

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   return (
//     <Provider store={store}>
//       <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
//         <Container>
//           <SafeAreaView style={{ flex: 1 }}>
//           <NAVSTRAT />
//             <IconButton  onPress={openModal}>
//               <Icon name="brightness-6" size={30} color={theme === 'light' ? '#000' : '#FFF'} />
//             </IconButton>
        
//             <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
//               <ModalContent>
//                 <ThemedText>Select Theme</ThemedText>
//                 <Button title="Light Theme" onPress={() => toggleTheme('light')} />
//                 <Button title="Dark Theme" onPress={() => toggleTheme('dark')} />
//                 <Button title="Cancel" onPress={() => setModalVisible(false)} />
//               </ModalContent>
//             </Modal>
//           </SafeAreaView>
//         </Container>
//       </ThemeProvider>
//     </Provider>
//   );
// };

// export default App;


