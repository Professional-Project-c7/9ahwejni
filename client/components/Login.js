import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipAdress } from '../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Information',
        text2: 'Please fill in all fields.',
      });
      return;
    }
    try {
      const response = await axios.post(
        `http://${ipAdress}:3000/api/auth/login`,
        { Email: email, Password: password }
      );
      await AsyncStorage.setItem('userToken', JSON.stringify(response.data.userId));
      await AsyncStorage.setItem('IdUser', JSON.stringify(response.data.IdUser));
      await AsyncStorage.setItem('NAME', JSON.stringify(response.data.name));

      await AsyncStorage.setItem('welcomeBack', 'true');  // Set flag for welcome message

       // Clear input fields
       setEmail('');
       setPassword('');
      navigation.navigate('Tabs');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email or password',
        text2: 'Please check your credentials.',
      });
    }
  };

  const navigateToUserAccount = () => {
    navigation.navigate('UserAccount');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../image/logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666666"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.passwordTextInput}
            placeholder="Password"
            placeholderTextColor="#666666"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Icon name='eye' style={styles.eyeImage} />
          </TouchableOpacity>
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
        Login
      </Button>
      <TouchableOpacity onPress={navigateToUserAccount}>
        <Text style={styles.createAccount}>Don't have an account? Create one</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
    color: 'black',
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFF',
    color: 'black',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
  },
  passwordTextInput: {
    flex: 1,
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFF',
    color: 'black',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    color: 'black',
  },
  eyeImage: {
    width: 25,
    height: 25,
    color: 'black',
  },
  button: {
    backgroundColor: '#dba617',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 25,
  },
  createAccount: {
    color: '#dba617',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    color: 'black',
    
  },
});

export default Login;
