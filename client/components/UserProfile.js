import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Image } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { Cloudinary } from 'cloudinary-react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


// import {Cloudinary} from "@cloudinary/url-gen";
          

  


const UserProfile = () => {
  const [imageUrl, setImageUrl] = useState(imageUrl);
  const [profile, setProfile] = useState({
    FirstName: '',
    Password: '',
    LastName: '',
    Adresse: '',
  });
 
 
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://${process.env.ipAdress}:3000/api/user/1`); // Assuming user ID is 1
      const userData = response.data;
      setProfile(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://${process.env.ipAdress}:3000/api/user/1`, profile);
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Profile</Text>
        <View style={styles.profileInfo}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Button
    title="+"
  onPress={handleImageUpload}
  icon={<Icon name="plus" size={75} color="black" />} // Add the icon to the button
  style={styles.button} // Assuming you have defined a style for the button
/>
        </View>
        <Text style={styles.Name}>{profile.FirstName}</Text>
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
        </View>
        
        <Button title="Save Changes" onPress={handleSave} />
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 30,
    position: 'relative',
    zIndex: 1,
    borderWidth: 5,
    borderColor: '#121212',
    backgroundColor: 'white',
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
});

export default UserProfile;
