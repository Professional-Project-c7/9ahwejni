import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
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
import { Cloudinary } from 'cloudinary-react-native'; // Import Cloudinary
import Icon from 'react-native-vector-icons/MaterialIcons';

// Configure Cloudinary
const cloudinaryConfig = {
  cloud_name: 'dmqumly45',
  api_key: '739151141682318',
  api_secret: 'lwkhlYbntud_BfDr3ys9jLHKiRM',
  upload_preset: 'YOUR_UPLOAD_PRESET'
};

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
    navigation.navigate('Login');
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

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {  
    try {
      const response = await axios.get(`http://${ipAdress}:3000/api/user/1`);
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
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        Alert.alert('Error', 'User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Error', 'ImagePicker Error: ' + response.error);
      } else {
        const uri = response.uri;
        setImageUri(uri);
        uploadImage(uri);
      }
    });
  };

  const uploadImage = async (uri) => {
    try {
      const data = new FormData();
      data.append('file', {
        uri: uri,
        type: 'image/jpeg', // Adjust the type according to your image type
        name: 'test.jpg' // Adjust the name if needed
      });

      data.append('upload_preset', cloudinaryConfig.upload_preset); 

      const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`, data);
      console.log('Uploaded image URL:', cloudinaryResponse.data.secure_url);

      // Update the user profile with the new image URL
      // For example, you can send a request to your backend to update the user's profile image
      // Here's a hypothetical example:
      // await axios.post(`http://${ipAdress}:3000/api/updateProfileImage`, { userId: profile.userId, imageUrl: cloudinaryResponse.data.secure_url });
      // Make sure to replace "userId" and "imageUrl" with your actual field names
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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
      <TouchableOpacity style={styles.button} onPress={navigateToUserAccount2}>
            <Icon name="arrow-forward" size={35} color="black" />
          </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  buttonText1: {
    color: 'black',
    marginLeft: 30,
    fontSize: 19
  },
};

export default UserProfile;
