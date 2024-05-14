import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, StatusBar, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton } from 'react-native-paper';
import RandomProducts from "../components/randomproducts";
import Pub from "../components/pub";
import TopShops from "../components/TopShops";
import logoImage from "../image/logo.png"; 
import { ipAdress } from '../config';
import CategoryBar from '../components/categorybar';
import Searchbar from '../components/searchbar';
import AdvancedFilter from '../components/AdvancedFilter';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MusicPlayer from './MusicPlayer';
import Notification from './Notification';

const HomePage = ({ navigation }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [type, setType] = useState(true);
  const [showNotification, setShowNotification] = useState(false);



  
  const showFilterModal = () => {
    setFilterVisible(true);
  };

  const hideFilterModal = () => {
    setFilterVisible(false);
  };

  const seeAll = async (product) => {
      navigation.navigate('AllProducts');
  };
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPrice = await AsyncStorage.getItem('userToken');
        if (storedPrice) {
          const parsedPrice = JSON.parse(storedPrice);
          if (parsedPrice === 'coffee'){
            setType(false);
          }
        }
      } catch (error) {
        console.log('Error fetching data:', error); 
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient 
        colors={['rgba(253,190,29,1)', 'rgba(252,145,69,1)']} 
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 0}} 
        style={styles.topBackground}
      >
        <View style={styles.top}>
        <IconButton icon="bell" color="#FFF" onPress={toggleNotification} />
          {/* <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logo} />
          </View> */}
          {type && <IconButton icon="cart" iconColor='#FFF' onPress={() => navigation.navigate('panier')} />}
        </View>
      </LinearGradient>
      <View style={styles.searchContainer}>
        {/* <MusicPlayer/> */}
        <Searchbar onFilterPress={showFilterModal} />
      </View>
      <View style={styles.categoryBarContainer}>
        <CategoryBar />
      </View>
      <Pub />
      <View style={styles.top}>
        <Text style={[styles.Texttitlecoffee, { marginLeft: 0 }]}>Products of the Day!</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllCoffees")}>
          <Text style={styles.seeAllText} onPress={seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <RandomProducts />
      <View style={styles.top}>
        <Text style={[styles.Texttitlecoffee, { marginLeft: 0 }]}>Top Coffee Shops of the Day!</Text>
      </View>
     <TopShops navigation={navigation} />

      <StatusBar style="auto" />

           <Modal
        visible={showNotification}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleNotification}
      >
        <View style={styles.notificationModal}>
         <Notification/>
          <IconButton icon="close" color="#000" onPress={toggleNotification} />
        </View>
      </Modal>





      {/* AdvancedFilter Modal */}
      <Modal
        visible={filterVisible}
        animationType="slide"
        transparent={false} // Ensure full screen
        onRequestClose={hideFilterModal}
      >
        <View style={styles.fullScreenModal}>
          <AdvancedFilter />
          <IconButton icon="close" onPress={hideFilterModal} style={styles.closeButton} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBackground: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
    notificationModal: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height:150
  },
    closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    paddingVertical: 10,
  },
  searchContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  logoContainer: {
    width: 82,
    height: 82,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 66,
    height: 66,
  },
  categoryBarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginRight: 30,
    left: 14
  },
  categoryTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    justifyContent: 'center',
    right : 15
  },
  Texttitlecoffee: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: '#dba617',
    textAlign: 'center',
    marginTop: 40,
    marginLeft: 20,
    flex: 1,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dba617',
    marginTop: 40,
    marginRight: 20,
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default HomePage;
