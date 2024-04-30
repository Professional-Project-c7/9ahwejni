import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,SafeAreaView, TouchableOpacity, Image ,ScrollView  } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';

const SignCofee = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [Adress, setAdress] = useState('');

  const HandleSubmit = async () => {
    try {
      const body = {
        UserType: 'coffee', 
        Adress:Adress,
        Email: email,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
      
      
      };
    
      const response = await axios.post(
        "http://192.168.11.60:3000/api/auth/register",
        body
      );
       
    } catch (error) {
      console.log(error);
     
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
          placeholder=" Adress"
          value={Adress}
          onChangeText={setAdress}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      
      </View>
      <Button style={styles.button} mode="contained" onPress={HandleSubmit}>
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
    width: '100%',
  
  },
  
  createAccount: {
    color: '#dba617',
    fontWeight: 'bold',
    fontSize: 16,
 
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

export default SignCofee;
