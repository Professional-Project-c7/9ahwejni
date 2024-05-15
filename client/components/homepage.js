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

  const seeAll = async () => {
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
        colors={['rgba(219, 166, 23, 1)', 'rgba(219, 166, 23, 1)']} 
        start={{x: 1, y: 1}} 
        end={{x: 1, y: 0}} 
        style={styles.topBackground}
      >
        <View style={styles.top}>
          <IconButton icon="bell" color="#FFF" onPress={toggleNotification} />
          {type && <IconButton icon="chat" iconColor='#FFF' onPress={() => navigation.navigate('chat')} />}
        </View>
      </LinearGradient>
      <View style={styles.searchContainer}>
        <Searchbar color='#dba617' onFilterPress={showFilterModal} />
      </View>
      {/* <View style={styles.categoryTitleContainer}>
        <Text style={styles.categoryTitle}>Category</Text>
      </View> */}
      <View style={styles.categoryBarContainer}>
        <CategoryBar />
      </View>
      <Pub />
      <View style={styles.top}>
        <Text style={[styles.Texttitlecoffee, { marginLeft: 0 }]}>Products of the Day!</Text>
        <TouchableOpacity onPress={seeAll}>
          <Text style={styles.seeAllText}>See All</Text>
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
          <Notification />
          <IconButton icon="close" color="#000" onPress={toggleNotification} />
        </View>
      </Modal>

      <Modal
        visible={filterVisible}
        animationType="slide"
        transparent={false}
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
    height: 150,
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
  categoryTitleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  categoryBarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
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
});

export default HomePage;
