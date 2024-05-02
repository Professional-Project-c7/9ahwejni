import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, StyleSheet,ScrollView, Button,Image } from 'react-native';
import axios from 'axios';
import { ipAdress } from '../config';
const UserProfile = () => {
 
  const [imageUrl, setImageUrl] = useState('https://b.fssta.com/uploads/application/soccer/headshots/713.png');
  const [imageUrl2, setImageUrl2] = useState('https://w0.peakpx.com/wallpaper/821/616/HD-wallpaper-coffee-beans-brown-cappuccino-cofee-beans-latte.jpg')
  const [profile, setProfile] = useState({
    FirstName:'',
    Password: '',
    LastName: '',
    Adresse:"",
   
  });

  // const {LastName ,Password, imageUrl,Adresse, imageUrl2 } = profile;

  
  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://${ipAdress}:3000/api/user/1`); // Assuming user ID is 1
      const userData = response.data;
      console.log(response.data);
     

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
  const handleImageChange = () => {
    // Example: change image URLs based on user input or any condition
    setImageUrl('NEW_IMAGE_URL1');
    setImageUrl2('NEW_IMAGE_URL2');
  };
  
 
 
  

  return (
   <ScrollView>
   
  
    <View style={styles.container}> 
  
 <Text style={styles.heading}>Profile</Text> 
  <View style={styles.profileInfo}>
  <Image source={{ uri: imageUrl }} style={styles.image} />
      <Image source={{ uri: imageUrl2 }} style={styles.image2} />
        </View>
        <Text style={styles.Name}>{profile.FirstName}</Text>
          <View style={styles.profileInfo}>
      
        <Text style={[styles.label, {marginTop: 100}]}>FirstName:</Text>
        <TextInput
          style={styles.input}
          value={profile.FirstName}
          onChangeText={(value) => setProfile({ ...profile, FirstName: value })}
          placeholder="Enter your name"
        />
        <Text style={styles.label}>LastName:</Text>
        <TextInput
          style={styles.input}
          value={profile.LastName}
          onChangeText={(value) => setProfile({ ...profile, Email: value })}
          placeholder="Enter your Email"
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={profile.Password}
          onChangeText={(value) => setProfile({ ...profile, bio: value })}
          placeholder ="Enter your password"
          secureTextEntry={true}
        />
          <Text style={styles.label}>Config Password:</Text>
        <TextInput
          style={styles.input}
          value={profile.Password}
          onChangeText={(value) => setProfile({ ...profile, bio: value })}
          placeholder ="Enter your password"
          secureTextEntry={true}
        />
        <Text style={styles.label}>Adresse:</Text>
           <TextInput
          style={styles.input}
          value={profile.Adresse}
          onChangeText={(value) => setProfile({ ...profile, birthday: value })}
          placeholder="City"
        />
           
      <View style={{ flexDirection: 'row' }}>
      </View> 
      </View>
      <Button icon="camera" buttonColor='black' mode="contained" title="Save Changes" onPress={handleSave} />
   
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
    color:'black'
    
  },

  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 30,
    position: 'relative',
    zIndex: 1,
    border: '5px solid #121212',
    backgroundColor:'white'
    
  },
  image2: {
    width: 380,
    height: 110,
    borderRadius: 10,
    position:'absolute',
    marginRight:100,
    top: 0,
    left: 0,
    right: 40,
    bottom: 0,
    zIndex: 0
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
    fontSize:30,
   textAlign:"center"
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    color:'black',
    placeholder: 'black',
    marginTop: 10,
  },
  input1: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '40%',
    
  },

  mapContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },

});

export default UserProfile;



// import React from 'react'

// export default function tes({navigation}) {
//   return (
//     <View>
//       <Text onPress={()=>{
//         navigation.navigate('test')
//       }}>go back to page 1</Text>
//     </View>
//   )
// }
