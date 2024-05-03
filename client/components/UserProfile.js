import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import SettingComponent from './Setting';
import axios from 'axios'
import { ipAdress } from '../config';
import { Button } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import Aother from './Another'


const UserProfile = () => {
  const [profile, setProfile] = useState({
    FirstName: '',
    Password: '',
    LastName: '',
    Adresse: '',
  });
  const [showSetting, setShowSetting] = useState(false);
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [ShowMainView, setShowMainView] = useState(false);

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
    setShowSetting(true); // Show the setting component
  };

  const handleCloseSetting = () => {
    setShowSetting(false);
    setShowMainView(true); 
    setShowOtherComponent(false)// Hide the setting component
  };

  const handleIconPress = () => {
    setShowOtherComponent(true)
  };
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.headerContainer}    >
        <IconButton icon="dots-vertical" style={styles.icon} onPress={handleIconPress}   />
        <Image
          style={styles.coverPhoto}
          source={{uri: 'https://w0.peakpx.com/wallpaper/821/616/HD-wallpaper-coffee-beans-brown-cappuccino-cofee-beans-latte.jpg'}}
        />
        <View style={styles.profileContainer1}>
          <Image
            style={styles.profilePhoto}
            source={{uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png'}}
          />
          <View style={styles.profileContainer}>
            <Text style={styles.Name}>{profile.FirstName}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bioContainer}>  
        <Text style={styles.bioText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
          ullamcorper nisi.
        </Text>
      </View>
      
      
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
        </View>
      </View>
      <View style={styles.statContainer1}> 
      <IconButton icon="post"  mode="contained" style={styles.button} onPress={handleSettingClick}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </IconButton>
      {showSetting && <SettingComponent onClose={handleCloseSetting} />}
      <IconButton icon="post"  mode="contained" style={styles.button} onPress={handleIconPress}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </IconButton>
      {showOtherComponent && <Aother onClose={handleCloseSetting} />}
      </View>
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
    flexDirection: 'row', // Display items in the same row
    alignItems: 'center', // Align items vertically
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileContainer1: {
    alignItems: 'center',
    marginTop: -50,
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
    marginBottom: 5,
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
    marginBottom: 20,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
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
   
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    width:200,
    marginLeft:100
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
};

export default UserProfile;
