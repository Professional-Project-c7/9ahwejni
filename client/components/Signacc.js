import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SignACC = ({ navigation }) => {
  const handleUserSignUp = () => {
    navigation.navigate('UserSignUp');
  };
  

  const handleCoffeeShopSignUp = () => {
    navigation.navigate('CoffeeShopSignUp');
  };

  const navigateToUserAccount = () => {
    navigation.navigate('Login'); 
  };
  return (
    <View style={styles.container}>
      <Image source={require('./../image/logo.png')} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUserSignUp}>
          <Text style={styles.buttonText}>for User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCoffeeShopSignUp}>
          <Text style={styles.buttonText}>for Coffee-Shop</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
    onPress={navigateToUserAccount}
   >
     <Text style={styles.createAccount}>do you  have an account? </Text>
   </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  createAccount: {
    color: '#dba617',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  button: {
    backgroundColor: '#dba617',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 5, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignACC;
