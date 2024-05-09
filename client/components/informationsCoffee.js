import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { ipAdress } from '../config';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
const [userID,setuserID] = useState(null)


const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userToken');
    if (value !== null) {
      const tokenObject = JSON.parse(value);
      const userId = tokenObject.userId; 
      console.log(userId);
      setuserID(userId);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

  

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
console.log(userData)

useEffect(() => {
  retrieveData();
}, []);

useEffect(() => {
  if (userID) {
    getUserData(userID);
  }
}, [userID]);


  return (
    <SafeAreaView style={styles.container}>
      {userData && (
        <>
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <TouchableOpacity>
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
                    <Icon name="camera" size={35} color='#dba617' style={{ opacity: 0.7 }} />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>{userData.FirstName + userData.LastName}</Text>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color='#dba617' size={20} />
              <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>{userData.Address}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color='#dba617' size={20} />
              <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>{userData.Email}</Text>
            </View>
          </View>
        </>
      )}

      <View style={styles.menuWrapper}>
       
        <TouchableRipple >
          <View style={styles.menuItem}>
            <Icon name="share-outline" color='#dba617' size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color='#dba617' size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color='#dba617' size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 65,
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10
  },
  menuWrapper: {
    // marginBottom: 55,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});