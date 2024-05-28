import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { IconButton } from 'react-native-paper';
import AddPacks from './addpacks';
import addProducts from './addproducts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MyComponent = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [userID, setuserID] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('IdUser');
      if (value !== null) {
        const userId = JSON.parse(value);
        setuserID(userId);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const getUserData = async (userId) => {
    try {
      const response = await axios.get(`http://${ipAdress}:3000/api/user/${userId}`);
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const removeTokenFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('IdUser');
      console.log('Token removed successfully');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  const handleLogout = () => {
    removeTokenFromStorage();
    navigation.navigate('Login');
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    if (userID) {
      getUserData(userID);
    }
  }, [userID]);

  const img = userData ? userData.ImageUrl : 'https://via.placeholder.com/150'; // Default placeholder image

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground 
            source={{ uri: img }}
            style={styles.profileImage}
          >
            <View style={styles.leftTextContainer}>
              <View style={styles.textWithIcon}>
                <Text style={styles.textrate}>4.5</Text>
                <IconButton icon="star" iconColor='#dba617' size={23} style={styles.starIcon} />
              </View>
            </View>

            <View style={styles.rightTextContainer}>
              <View style={styles.textWithIcon}>
                <IconButton icon="google-maps" iconColor='#dba617' size={23} style={styles.locIcon} />
                <Text style={styles.textloc}>Gabes</Text>
              </View>
            </View>
            <IconButton icon="keyboard-backspace" iconColor='#dba617' size={35} style={styles.backIcon} />
          </ImageBackground>
        </View>

        <View style={styles.profileInfo}>
          {/* <Text style={styles.name}>{userData.FirstName+" "+userData.LastName}</Text> */}
        </View>
        <View style={styles.optionsContainerOne}>
          <TouchableOpacity style={styles.optionOne} onPress={() => navigation.navigate('Info')}>
            <View style={styles.optionContent}>
              <Image source={require("../image/profile.png")} style={styles.optionImageE} />
              <Text style={styles.optionText}>INFORMATIONS</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionOne} onPress={() => navigation.navigate('Availability')}>
            <View style={styles.optionContent}>
              <Image source={require("../image/availability.png")} style={styles.optionImageE} />
              <Text style={styles.optionText}>AVAILABILITY</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionOne} onPress={() => navigation.navigate('SettingsScreen')}>
            <View style={styles.optionContent}>
              <Image source={require("../image/settings.png")} style={styles.optionImageE} />
              <Text style={styles.optionText}>SETTINGS</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AddPacks')}>
            <View style={styles.test} >
              <Image source={require("../image/packs.png")} style={styles.optionImage} />
            </View>
            <Text style={styles.optionText}>ADD PACKS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AddProducts')}>
            <View style={styles.test} >
              <Image source={require("../image/coffee-cup.png")} style={styles.optionImage} />
            </View>
            <Text style={styles.optionText}>ADD PRODUCTS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Orders')}>
            <View style={styles.test} >
              <Image source={require("../image/online-order.png")} style={styles.optionImage} />
            </View>
            <Text style={styles.optionText}>ORDERS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('CoffeeshopReviews')}>
            <View style={styles.test} >
              <Image source={require("../image/reviews.png")} style={styles.optionImage} />
            </View>
            <Text style={styles.optionText}>REVIEWS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PaymentCardsDetails')}>
            <View style={styles.test} >
              <Image source={require("../image/credit-card.png")} style={styles.optionImage} />
            </View>
            <Text style={styles.optionText}>PAYMENT DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TransactionScreenCoffee')}>
            <View style={styles.test} >
              <Image source={require("../image/transaction.png")} style={styles.optionImage} />
            </View>
            <Text style={styles.optionText}>TRANSACTIONS</Text>
          </TouchableOpacity>
        </View>
        
        {/* Add more options here */}
        <View style={styles.logout}>
          <TouchableOpacity style={styles.optionOne} onPress={toggleModal}>
            <View style={styles.optionContent}>
              <Image source={require("../image/logout.png")} style={styles.optionImageE} />
              <Text style={styles.optionText}>LOG OUT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Do you want to logout?</Text>
              <TouchableOpacity style={styles.closeButton} onPress={handleLogout}>
                <Text style={styles.closeButtonText}>Log out</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  test :{
    backgroundColor: 'white',
  },
    textWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
      },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    // marginTop: 10,
    backgroundColor: 'goldenrod',
    padding: 10,
    borderRadius: 5,
    // flexDirection: 'row',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    flexDirection: 'row',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    flexDirection: 'row',
  },
  header: {
    backgroundColor: '#dba617',
  },
  profileImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  profileInfo: {
    alignItems: 'center',
    // padding: 16,
//     backgroundImage: 'url("https://as1.ftcdn.net/v2/jpg/01/64/55/04/1000_F_164550456_vWCyP4t3VtCUeYIb09IxYB1WAwj3cEvO.jpg")',
//     backgroundSize: 'cover', 
//     backgroundPosition: 'center', 
},
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color:"black"
  },
  expense: {
    fontSize: 18,
    marginTop: 8,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: "white",
    padding: 16,
    marginBottom:-30,
    borderRadius: 10,
  },
  optionsContainerOne: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginLeft:40,
    marginRight:40,
    marginTop:30,
    marginBottom:30,
    padding: 16,
    // backgroundColor: "rgba(219, 219, 219, 0.8)",
    borderRadius: 10,
  },
  logout: {
   
      
    marginLeft:80,
    // marginRight:100,
    marginTop:30,
    marginBottom:30,
    padding: 16,
    flexDirection: 'row',
    // backgroundColor: "rgba(219, 219, 219, 0.8)",
    borderRadius: 10,
    width:250
  },
  option: {
    flex: 1,
    margin: 8,
    backgroundColor: '#dba617',
    borderRadius: 10,
    elevation: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionOne: {
    
    flex: 1,
    margin: 8,
    backgroundColor: '#dba617',
    borderRadius: 50,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionImage: {
    width: 80, // Adjust the width of the image
    height: 60, // Adjust the height of the image
    alignSelf: 'center', // Center the image horizontally
    marginBottom: 10, // Add margin to separate image from text
    resizeMode: 'contain', // Ensure the image fits within its container
    marginTop:20,
    
  },
  optionImageE: {
    width: 80, // Adjust the width of the image
    height: 30, // Adjust the height of the image
    alignSelf: 'center', // Center the image horizontally
    marginBottom: 10, // Add margin to separate image from text
    resizeMode: 'contain', // Ensure the image fits within its container
    marginTop:10,
    
  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    color: '#ffffff',
    marginRight:20
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
    width: '40%',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 40,
    marginLeft: 36,
  },
  logoutText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginLeft: 16,
  },
  leftTextContainer: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    height:30,
    width:70
  },
 
  rightTextContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    
    padding: 5,
    height:30,
    width:80
  },
  textrate: {
    color: '#dba617',
    top:-15,
    right:-7,
    fontSize:17
  },
  starIcon: {
    left:-5,
      top:-15

    },
    textloc: {
        color: '#dba617',
        top:-15,
        right:32,
        fontSize:17
      },
      locIcon: {
        left:-18,
          top:-15
    
        }
  
});

export default MyComponent;
