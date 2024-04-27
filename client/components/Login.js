import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

const Login = () => {
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: ''} style={styles.logo} /> */}
      <Text style={styles.title}>welcome</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      </View>
      <Button style={styles.button} mode="contained">
        Login
      </Button>
      <TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
    backgroundColor: '#4CAF50',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 14,
  },
  or: {
    color: '#999',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  createAccount: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default Login;
