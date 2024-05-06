// UserProfile.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import SettingComponent from './Setting';
import axios from 'axios';
import { ipAdress } from '../config';
import { IconButton } from 'react-native-paper';
import Aother from './Another';
import Favoritelist from './Favoritelist';
import logoImage from "../image/logo.png";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Login  from './Login';
// import { uploadImageToCloudinary } from './Cloudinary'; // Import the Cloudinary upload function
import { launchImageLibrary } from 'react-native-image-picker'; // Import the image picker
import { Cloudinary } from 'cloudinary-react-native';
const UserProfile = () => {
  const [profile, setProfile] = useState({
    FirstName: '',
    Password: '',
    LastName: '',
    Adresse: '',
   
  });
  const [showSetting, setShowSetting] = useState(false);
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [ShowMainView, setShowMainView] = useState(true);
  const [favoritelist, setFavoritelist] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [imageUri, setImageUri] = useState(null);

  const fetchUserProfile = async () => {  
    try {
      const response = await axios.get(`http://${ipAdress}:3000/api/user/1`); // Assuming user ID is 1
      const userData = response.data;
      setProfile(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
      const cloudinaryResponse = await Cloudinary.upload(uri, "dmqumly45", "YOUR_UPLOAD_PRESET");
      console.log('Uploaded image URL:', cloudinaryResponse.secure_url);
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
                 source={{ uri: profile.ProfileImage }}
               />
             </TouchableOpacity>
             <View style={styles.profileContainer}>
               <Text style={styles.Name}>{profile.FirstName}</Text>
             </View>
          </>
        )}
        {showSetting && <SettingComponent onClose={handleClose} />}
        {showOtherComponent && <Aother onClose={handleClose} />}
        {favoritelist && <Favoritelist onClose={handleClose} />}
      </View>

      <View style={styles.statContainer1}>
        <IconButton icon="account-edit-outline"  style={styles.button1} onPress={handleSettingClick}>
        </IconButton>
          <Text style={styles.buttonText1}>Edit Profile</Text>
        </View>
        <View style={styles.statContainer2}>
        <IconButton icon="cards-heart-outline"  style={styles.button} onPress={handleIconPress}>
        </IconButton>
          <Text style={styles.buttonText1}>Favorite List</Text>
      </View>
      <View style={styles.statContainer2}>
        <IconButton icon="account-plus-outline"  style={styles.button} onPress={handleFavList}>
        </IconButton> 
          <Text style={styles.buttonText1}>Order List</Text>
      </View>
     
        <IconButton  icon="account-plus-outline" onPress={Login} />
       
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
