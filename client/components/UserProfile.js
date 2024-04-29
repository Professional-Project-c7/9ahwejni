import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, StyleSheet,ScrollView, Button,Image } from 'react-native';
import axios from 'axios';

const UserProfile = ({navigation}) => {
  const [FirstName, setFirstName] = useState('');
  const [profile, setProfile] = useState({
    
    imageUrl2: 'https://w0.peakpx.com/wallpaper/821/616/HD-wallpaper-coffee-beans-brown-cappuccino-cofee-beans-latte.jpg',
   imageUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/713.png', // Provided image URL
   
  });

  const {  imageUrl, imageUrl2 } = profile;

  const handleSave = () => {
    console.log('Changes saved');
  };
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.11.13:3000/api/user/${FirstName}`);
        const fetchedName = response.data.FirstName; // Assuming the API returns an object with a 'name' property
        setFirstName(fetchedName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
   <ScrollView>
    
  
    <View style={styles.container}> 
  
      <Text style={styles.heading}>oo</Text> 
      <View style={styles.profileInfo}>
  <Image source={{ uri: imageUrl }} style={styles.image} />
  <Image source={{ uri: imageUrl2 }} style={styles.image2} />
</View>
      <View style={styles.profileInfo}>
      
        <Text style={[styles.label, {marginTop: 100}]}>{FirstName}</Text>
        <TextInput
          style={styles.input}
          value={FirstName}
          onChangeText={(value) => setFirstName({ ...profile, name: value })}
          placeholder="Enter your name"
        />
        <Text style={styles.label}>Email:</Text>
        {/* <TextInput
          style={styles.input}
          value={email}
          onChangeText={(value) => setProfile({ ...profile, email: value })}
          placeholder="Enter your email"
        /> */}
        <Text style={styles.label}>Password:</Text>
        {/* <TextInput
          style={styles.input}
          value={bio}
          onChangeText={(value) => setProfile({ ...profile, bio: value })}
          placeholder ="Enter your password"
          secureTextEntry={true}
        /> */}
        <Text style={styles.label}>Birthday:</Text>
           {/* <TextInput
          style={styles.input}
          value={birthday}
          onChangeText={(value) => setProfile({ ...profile, birthday: value })}
          placeholder="DD/MM/YY"
        /> */}
         <Text style={styles.label}>Number:</Text>
           {/* <TextInput
          style={styles.input}
          value={birthday}
          onChangeText={(value) => setProfile({ ...profile, Number: value })}
          placeholder="Number..."
        /> */}
          <Text style={styles.label}>Gendre:</Text>
      <View style={{ flexDirection: 'row' }}>
  {/* <TextInput
    style={[styles.input1, {marginRight: 69}]}
    value={birthday}
    onChangeText={(value) => setProfile({...profile, Number: value })}
    placeholder="Number..."
  />
  <TextInput
    style={styles.input1}
    value={birthday}
    onChangeText={(value) => setProfile({...profile, Number: value })}
    placeholder="Number..."
  /> */}
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
    color: 'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    color:'black',
    placeholder: 'black'
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
