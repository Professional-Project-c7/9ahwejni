import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { ipAdress } from '../config';
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);



  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://${ipAdress}:3000/api/auth/login`,
        { Email: email, Password: password }
      );
      AsyncStorage.setItem('userToken', JSON.stringify(response.data)); 
     console.log(response.data);
      navigation.navigate('st2'); 
      
    } catch (error) {            
        console.log(error);  
        setError(error.message);    
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
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
        Login
      </Button>
      <TouchableOpacity onPress={navigateToUserAccount}>
        <Text style={styles.createAccount}>Don't have an account? Create one</Text>
      </TouchableOpacity>
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
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFF',
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
  },
});

export default Login;
