import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { ipAdress } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcryptjs';

const SettingsScreen = () => {
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState(null);
  const [notificationAllowed, setNotificationAllowed] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [securityDropdownVisible, setSecurityDropdownVisible] = useState(false);
  const [changePasswordDropdownVisible, setChangePasswordDropdownVisible] = useState(false);
  const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    if (userID) {
      getUserData(userID);
    }
  }, [userID]);

  const getUserData = async (userId) => {
    try {
      const response = await axios.get(`http://${ipAdress}:3000/api/user/${userId}`);
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('IdUser');
      if (value !== null) {
        const tokenObject = JSON.parse(value);
        const userId = tokenObject;
        setUserID(userId);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const handleUpdateProfile = async (hashedNewPassword) => {
    try {
      const updatedUserData = {
        Password: hashedNewPassword,
      };
      const response = await axios.put(`http://${ipAdress}:3000/api/user/${userID}`, updatedUserData);
      console.log('Update successful:', response.data);
      Alert.alert('Success', 'Your password has been updated successfully.');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const toggleNotificationPermission = () => {
    setNotificationAllowed(!notificationAllowed);
  };

  const handleSavePassword = async () => {
    try {
      if (!userData) {
        Alert.alert('Error', 'User data not loaded yet.');
        return;
      }
  
      const passwordMatch = await bcrypt.compare(oldPassword, userData.Password);
  
      if (!passwordMatch) {
        Alert.alert('Wrong Password', 'Please enter your old password correctly.');
        return;
      }
  
      if (newPassword !== confirmNewPassword) {
        Alert.alert('Password Mismatch', 'New password and confirm password do not match.');
        return;
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user data with the new hashed password
      const updatedUserData = {
        Password: hashedNewPassword,
      };
  
      await handleUpdateProfile(hashedNewPassword);
  
      // Update local state after successful profile update
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      Alert.alert('Success', 'Your password has been updated successfully.');
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'Failed to update password. Please try again later.');
    }
  };

  const toggleSecurityDropdown = () => {
    setSecurityDropdownVisible(!securityDropdownVisible);
  };

  const toggleChangePasswordDropdown = () => {
    setChangePasswordDropdownVisible(!changePasswordDropdownVisible);
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdownVisible(!notificationDropdownVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.optionContainer}>
        {/* Account Settings */}
        <TouchableOpacity style={styles.option} onPress={toggleSecurityDropdown}>
          <Icon name="user" style={styles.optionIcon} color={'#dba617'} />
          <Text style={styles.optionText}>Security</Text>
          <Icon name={securityDropdownVisible ? "angle-up" : "angle-down"} style={styles.optionIcon} />
        </TouchableOpacity>
        {securityDropdownVisible && (
          <View style={styles.dropdown}>
            {/* Change Password dropdown */}
            <TouchableOpacity style={styles.option} onPress={toggleChangePasswordDropdown}>
              <Text style={styles.optionText}>Change Password</Text>
              <Icon name={changePasswordDropdownVisible ? "angle-up" : "angle-down"} style={styles.optionIcon} />
            </TouchableOpacity>
            {changePasswordDropdownVisible && (
              <View style={styles.dropdown}>
                <TextInput
                  style={styles.input}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry={true}
                />
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={true}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                  secureTextEntry={true}
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* End of Change Password dropdown */}
            {/* Other options under Security */}
            {/* Add other options here */}
          </View>
        )}

        {/* Notification Settings */}
        <TouchableOpacity style={styles.option} onPress={toggleNotificationDropdown}>
          <Icon name="bell" style={styles.optionIcon} color={'#dba617'} />
          <Text style={styles.optionText}>Notification Settings</Text>
          <Icon name={notificationDropdownVisible ? "angle-up" : "angle-down"} style={styles.optionIcon} />
        </TouchableOpacity>
        {notificationDropdownVisible && (
          <View style={styles.dropdown}>
            <View style={styles.notificationOption}>
              <Text>Allow Notifications</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#dba617" }}
                thumbColor={notificationAllowed ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleNotificationPermission}
                value={notificationAllowed}
              />
            </View>
          </View>
        )}

        {/* Privacy Settings */}
        {/* Privacy settings content goes here */}

        {/* Help & Support */}
        {/* Help & support content goes here */}

        {/* About */}
        {/* About content goes here */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
    // alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  optionIcon: {
    fontSize: 20,
  },
  dropdown: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:25,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#dba617',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SettingsScreen;
