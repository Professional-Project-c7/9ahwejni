import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';

const SignCofee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [Adress, setAdress] = useState('');

  const HandleSubmit = async () => {
    try {
      const body = {
        UserType: 'cofee', 
        Adress:Adress,
        Email: email,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        PhoneNumber: phoneNumber,
        imageUrl: profilePicture, 
      };

      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        body
      );
      
      console.log(response.data);
     
    } catch (err) {
      console.log(err);
     
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <TouchableOpacity
        style={styles.profileImagePlaceholder}
        onPress={() => {
         
        }}
      >
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <Text style={styles.profileImageText}>Add Profile Picture</Text>
        )}
      </TouchableOpacity>

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
});

export default SignCofee;
