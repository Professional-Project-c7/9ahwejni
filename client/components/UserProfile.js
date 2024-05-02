import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Image } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { Cloudinary } from 'cloudinary-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ipAdress } from '../config';

const UserProfile = () => {
  const [imageUrl, setImageUrl] = useState(imageUrl);
  const [profile, setProfile] = useState({
    FirstName: '',
    Password: '',
    LastName: '',
    Adresse: '',
  });
  const [showSetting, setShowSetting] = useState(false); 
  const [settingText, setSettingText] = useState(''); 

  const user = {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    coverPhoto: "https://www.bootdey.com/image/280x280/FF00FF/000000",
    name: "John Smith"
  };
 
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {  
    try {
      const response = await axios.get(`http://${ipAdress}:3000/api/user/1`); // Assuming user ID is 1
      const userData = response.data;
      setProfile(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://${ipAdress}:3000/api/user/1`, profile);
      console.log('Changes saved');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (!response.didCancel) {
        const { uri } = response.assets[0];
        try {
          const result = await Cloudinary.upload(uri);
          const imageUrl = result.secure_url;
          setImageUrl(imageUrl);
        } catch (error) {
          console.error('Error uploading image to Cloudinary:', error);
        }
      }
    });
  };
  const handleSettingClick = () => {
    setShowSetting(true); // Show the setting view
    setSettingText('Setting'); // Set the setting text
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image source={{ uri: user.coverPhoto }} style={styles.coverPhoto} />
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.Name}>{profile.FirstName}</Text>
          </View>
          <View style={styles.buttonContainer}>
          <Button title="setting" onPress={handleSettingClick} />
            <Button title="camande" onPress={() => {}} />
          </View>
        </View>

        {showSetting ? ( 
          <View style={styles.settingContainer}>
            <Text style={styles.settingText}>{settingText}</Text> {/* Display the setting text */}
            <Button title="Close" onPress={() => setShowSetting(false)} /> {/* Close button to hide the setting view */}
          </View>
        ) : (
          <View style={styles.profileInfo}>
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
            <Text style={styles.label}>Adresse:</Text>
            <TextInput
              style={styles.input}
              value={profile.Adresse}
              onChangeText={value => setProfile({ ...profile, Adresse: value })}
              placeholder="Enter your address"
            />
            <Button title="Save Changes" onPress={handleSave} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
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
  settingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    marginRight: 290,
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
    width: '100%',
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
    resizeMode: 'cover',
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

export default UserProfile;
