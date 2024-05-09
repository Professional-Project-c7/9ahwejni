import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Image } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { ipAdress } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Cloudinary} from "@cloudinary/url-gen";
          

const SettingComponent = ({ onClose }) => {
  const cld = new Cloudinary({cloud: {cloudName: 'dmqumly45'}});
    const [imageUrl, setImageUrl] = useState(imageUrl);
    const [profile, setProfile] = useState({
      FirstName: '',
      Password: '',
      LastName: '',
      Adresse: '',
    });
   
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
  
    const handleSave = async () => {
      try {
        await axios.patch(`http://${ipAdress}:3000/api/user/1`, profile);
        console.log('Changes saved');
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    };

  return (
  
    
      <View style={styles.profileInfo}>
        <View style={styles.icon} >
        <Icon name="close" size={30} onPress={onClose}   />
</View>
              <Text style={[styles.label, { marginTop: 100 }]}>FirstName:</Text>
              <TextInput
                style={styles.input}
                value={profile.FirstName}
                onChangeText={value => setProfile({ ...profile, FirstName: value })}
                placeholder="Enter your name"
              />
              <Text style={styles.label}>LastName:</Text>
              <TextInput
                style={styles.input}
                value={profile.LastName}
                onChangeText={value => setProfile({ ...profile, LastName: value })}
                placeholder="Enter your last name"
              />
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                value={profile.Password}
                onChangeText={value => setProfile({ ...profile, Password: value })}
                placeholder="Enter your password"
                secureTextEntry={true}
              />
              <Text style={styles.label}>Config Ps:</Text>
               <TextInput
                style={styles.input}
                value={profile.Password}
                onChangeText={value => setProfile({ ...profile, Password: value })}
                placeholder="Enter your password"
                secureTextEntry={true}
              />
              <Text style={styles.label}>Adresse:</Text>
              <TextInput
                style={styles.input}
                value={profile.Adresse}
                onChangeText={value => setProfile({ ...profile, Adresse: value })}
                placeholder="Enter your address"
              />
                  <Icon name="save" style={{color:'black'}}  size={30} onPress={handleSave} />
             
             </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      position: 'absolute',
      top: '50%',
      width: '100%',
      zIndex: 1,
    },
  
    buttonWrapper: {
      width: 150,
      height: 50,
      
      
    },
    icon:{
      marginTop:60,
    
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      marginTop: 20,
      color: 'black',
    },
    profileInfo: {
      alignItems: 'center',
      marginBottom: 20,
      position: 'relative',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'black',
      marginRight: 220,
    },
    
    Name: {
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'black',
      fontSize: 30,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: 300,
      color: 'black',
      marginTop: 10,
    },
    button: {
      backgroundColor:'black',
      color: 'black',
      marginLeft:900
    },
    coverPhoto: {
      width: '100%',
      height: 200,
     
    },
    avatarContainer: {
      alignItems: 'center',
      marginTop: -75,
    },
    avatar: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 5,
      borderColor: 'white',
    },
    name: {
      marginTop: 15,
      fontSize: 20,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 20,
      width: '60%',
      justifyContent: 'space-between',
    },
    settingText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });
  
export default SettingComponent;


