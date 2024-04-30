import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput,SafeAreaView, TouchableOpacity, Image ,ScrollView  } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
const SignUser = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const body = {
        UserType: "client",
        Email: email,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        PhoneNumber: PhoneNumber,
        ImageUrl: profilePicture,
      };
      
      console.log("Sending sign up request with body:", body);
     
      const response = await axios.post(
        `http://${process.env.ipAdress}:3000/api/auth/register`,
      
        body
      );
     
      console.log("Response data:", response.data);
  
     
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setProfilePicture('');
  
     
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };
  

  const navigateToUserAccount = () => {
    navigation.navigate('Login'); 
  };

  return (
    <SafeAreaView >
    <ScrollView  >
    
    <View style={styles.container}>
       <Image source={require('./../image/logo.png')} style={styles.logo} />
      
     

      <View style={styles.inputContainer}>
        
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="PhoneNumber"
          value={PhoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button style={styles.button} mode="contained" onPress={handleSignIn}>
        Sign Up
      </Button>
    
    <TouchableOpacity
    onPress={navigateToUserAccount}
   >
     <Text style={styles.createAccount}>do you  have an account? </Text>
   </TouchableOpacity>
   </View>
   </ScrollView>
    </SafeAreaView>
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
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#DDD',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageText: {
    fontSize: 16,
    color: '#555',
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  
  createAccount: {
    color: '#dba617',
    fontWeight: 'bold',
    fontSize: 16,
    marginEnd:50,

    marginVertical:20,
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUser;
