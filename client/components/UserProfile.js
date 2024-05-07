import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView,Modal, TouchableOpacity, Alert } from 'react-native';
import SettingComponent from './Setting';
import axios from 'axios';
import { ipAdress } from '../config';
import { IconButton } from 'react-native-paper';
import Another from './Another';
import Favoritelist from './Favoritelist';
import logoImage from "../image/logo.png";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { launchImageLibrary } from 'react-native-image-picker';
import {v2 as cloudinary } from 'cloudinary-react-native'; // Import Cloudinary
import Icon from 'react-native-vector-icons/MaterialIcons';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { CommonActions } from '@react-navigation/native';
// Configure Cloudinary

const UserProfile = ({ navigation }) => {

  const removeTokenFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('Token removed successfully');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  const navigateToUserAccount2 = () => {
     

    removeTokenFromStorage();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };
 

  const [profile, setProfile] = useState({
    FirstName: '',
    LastName: '',
    Adresse: '',
    ProfileImage: ''
  });
  const [showSetting, setShowSetting] = useState(false);
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [ShowMainView, setShowMainView] = useState(true);
  const [favoritelist, setFavoritelist] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [userToken, setUserToken] = useState("");
  

  useEffect(() => {
    // Function to retrieve user token from AsyncStorage
    const getUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log("thats my token",token);
        setUserToken(token ? JSON.parse(token) : null);
      } catch (error) {
        console.log('Error retrieving user token:', error);
      }
    };

    // Call the function to retrieve user token
    getUserToken();
  }, []);

  const fetchUserProfile = async () => {  
    try {
      const response = await axios.get(`http://${ipAdress}:3000/api/user/${userId}`);
      const userData = response.data;
      setProfile(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
 

  const handleSettingClick = () => { 
    setShowSetting(true);
    setShowMainView(false);
    setShowOtherComponent(false);
  };
  
  const handleFavList = () => {
    setFavoritelist(true);
    setShowMainView(false);
  };
  
  const handleIconPress = () => {
    setShowOtherComponent(true);
    setShowMainView(false);
    setShowSetting(false); 
    setFavoritelist(false);
  };

  const handleClose = () => {
    setShowMainView(true);
    setShowSetting(false);
    setShowOtherComponent(false); 
    setFavoritelist(false);
  };
 
  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        uploadImage(uri);
      }
    });
  };

  const uploadImage = async (uri) => {
    try {
      const response = await cloudinary.uploader.upload(uri);
      console.log('Upload successful:', response);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.headerContainer}>
     
        {ShowMainView && (
          <>
            
            <View style={styles.top}>
              <Image source={logoImage} style={styles.logo} /> 
            </View>
            <TouchableOpacity style={styles.profileContainer1} onPress={handleChooseImage}>
              <Image
                style={styles.profilePhoto}
                source={{ uri: profile.ProfileImage || 'https://c0.lestechnophiles.com/www.numerama.com/wp-content/uploads/2018/01/facebook-profil-680x383.jpg?resize=500,281&key=57ef287a' }}
              />
            </TouchableOpacity>
            <View style={styles.profileContainer}>
              <Text style={styles.Name}>{profile.FirstName} </Text>
            </View>
          </>
        )}
        {showSetting && <SettingComponent onClose={handleClose} />}
        {showOtherComponent && <Another onClose={handleClose} />}
        {favoritelist && <Favoritelist onClose={handleClose} />}
      </View>

      {/* Buttons for Editing Profile and Lists */}
      <View style={styles.statContainer1}>
        <IconButton icon="account-edit-outline" style={styles.button1} onPress={handleSettingClick}>
        </IconButton>
          <Text style={styles.buttonText1}>Edit Profile</Text>
        </View>
        <View style={styles.statContainer2}>
        <IconButton icon="cards-heart-outline" style={styles.button} onPress={handleIconPress}>
        </IconButton>
          <Text style={styles.buttonText1}>Favorite List</Text>
      </View>
      <View style={styles.statContainer2}>
        <IconButton icon="account-plus-outline" style={styles.button} onPress={handleFavList}>
        </IconButton> 
          <Text style={styles.buttonText1}>Order List</Text>
      </View>
      {/* <TouchableOpacity onPress={navigateToUserAccount2}>
            <Icon name="logout" size={20} color="black" />
          </TouchableOpacity> */}
           <View style={styles.statContainer2}>
        <IconButton icon="logout" style={styles.button} onPress={toggleFormVisibility}>
        </IconButton> 
          <Text style={styles.buttonText1}>logout</Text>
      </View>
           {/* <Icon name= 'login'  size={30} onPress={toggleFormVisibility}  style={styles.log} >
            </Icon>
           <Text style={styles.textStyle1}>Logout</Text> */}
       
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFormVisible}
        onRequestClose={() => {
          setFormVisible(!isFormVisible);
        }}
      >
         <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.textStyle2}> | </Text> */}
            {/* Your form components here */}
            <TouchableOpacity
              style={{ ...styles.closeButton, backgroundColor: '#2196F3' }}
              onPress={toggleFormVisibility}
            >
              <Text style={styles.textStyle}> close </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.closeButton, backgroundColor: '#2196F3' }}
              onPress={navigateToUserAccount2}
            >
              <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:'white',
    fontSize:18,
    // marginBottom:10

   
  },
  textStyle2: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:'white',
    fontSize:18

   
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    // backgroundColor: '#f4511e',
    fontSize:50,
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // backgroundColor:'black'
  },
  modalView: {
    margin: 20,
    width:300,
    height:100,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',

    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black', // Set the border color to black
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  optionOne:{
    backgroundColor: 'black',
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileContainer1: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'black',
    overflow: 'hidden',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    // Your styles
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 20
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  Name: {
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 30,
    color: 'black',
    marginLeft: 350,
  },
  bioText: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  statContainer1: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginLeft: 130,
    padding: 8
  },
  statContainer2: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginLeft: -50,
    padding: 8
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
  },
  button: {
    borderRadius: 100,
    padding: 10,
    marginHorizontal: 20,
    width: 50,
    marginLeft: 100,
    backgroundColor: '#E4C59E'
  },
  button1: {
    borderRadius: 100,
    padding: 10,
    marginHorizontal: 20,
    width: 50,
    marginLeft: -80,
    backgroundColor: '#E4C59E',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginRight: 70
  },
  // textStyle1: {
  //   color: 'black',
  //   marginLeft: 200,
  //   fontSize: 19,
  //   marginBottom:80
  // },
  buttonText1: {
    color: 'black',
    marginLeft: 30,
    fontSize: 19
  },
  log: {
    color: 'black',
    marginLeft: 57,
    fontSize: 19,
    marginTop:15,
    borderRadius: 100,
    padding: 10,
    marginHorizontal: 20,
    width: 50,
    // marginLeft: 100,
    backgroundColor: '#E4C59E'
  },
};

export default UserProfile;
