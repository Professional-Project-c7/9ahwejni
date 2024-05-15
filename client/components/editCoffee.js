import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';
import { ipAdress } from '../config';


const EditProfileScreen = ({navigation}) => {
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState(
    'https://api.adorable.io/avatars/80/abott@adorable.png',
  );
  const {colors} = useTheme();

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('IdUser');
      if (value !== null) {
        const tokenObject = JSON.parse(value);
        const userId = tokenObject; 
        console.log("taww",userId);
        setUserID(userId);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        country: country,
        city: city
      };
      console.log(userData); // Check if userData is correct before sending the request
      const response = await axios.put(`http://${ipAdress}:3000/api/user/${userID}`, userData);
      
      console.log('Update successful:', response.data);
     
      console.log(userID);
      navigation.navigate('User');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  // const handleUpdateProfile = async () => {
  //   try {
  //     await axios.patch(`http://${ipAdress}:3000/api/user/${userID}`, userData);
  //     console.log('Changes saved');
  //   } catch (error) {
  //     console.error('Error updating user profile:', error);
  //   }
  // };
  
const getUserData = async (userId) => {
  try {
    const response = await axios.get(`http://${ipAdress}:3000/api/user/${userId}`);
    console.log(response.data); // Check response data
    if (response.status === 200) {
      setUserData(response.data);
    } else {
      console.error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
};
useEffect(() => {
  if (userID) {
    getUserData(userID);
  }
}, [userID]);

  

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  // renderHeader = () => (
  //   <View style={styles.header}>
  //     <View style={styles.panelHeader}>
  //       <View style={styles.panelHandle} />
  //     </View>
  //   </View>
  // );


  return (
    <ScrollView style={styles.container}>
      <View>
     {userData && (
        <>
        <View style={{alignItems: 'center', marginTop:15}}>
          <TouchableOpacity >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                
              }}>
              <ImageBackground
                source={require("../image/image.png")} 
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color='#dba617'
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
          {userData.FirstName }

          </Text>
        </View>

        </>
      )}
        <View style={styles.action}>
          <FontAwesome name="user-o" color={'#dba617'} size={20} />
          <TextInput
            placeholder={userData.FirstName}
            value={firstName}
        onChangeText={text => setFirstName(text)}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={'#dba617'} size={20} />
          <TextInput
            placeholder={userData.lastName}
            placeholderTextColor="#666666"
            value={lastName}
        onChangeText={text => setLastName(text)}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={'#dba617'} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            value={phone}
        onChangeText={text => setPhone(text)}
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={'#dba617'} size={20} />
          <TextInput
            placeholder={userData.Email}
            placeholderTextColor="#666666"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color={'#dba617'} size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={'#dba617'} size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={handleUpdateProfile}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      height: 100,
      width: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImageBackground: {
      height: 100,
      width: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#000',
      padding: 10,
      borderRadius: 20,
    },
    userName: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    action: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      paddingLeft: 10,
      color: '#05375a',
    },
    commandButton: {
      marginTop: 20,
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#dba617',
      alignItems: 'center',
    },
    commandButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    panel: {
      padding: 20,
      backgroundColor: '#fff',
    },
    panelTitle: {
      fontSize: 27,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    panelSubtitle: {
      fontSize: 14,
      color: '#666',
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#fff',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
  });