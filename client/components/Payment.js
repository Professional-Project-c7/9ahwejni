import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet , Linking  } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



import { ipAdress } from '../config';

function Paye() {

  const [PRIXX, setPRIXX] = useState([]);

console.log("hhhh",PRIXX);

  const [formData, setFormData] = useState({
    amount: '',
    payment_method: '', // To store the selected payment method
    card_number: '',
    expiry_month: '',
    expiry_year: '',
    cvv: ''
  });
 
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPosts = await AsyncStorage.getItem('PRICE');
        
        if (storedPosts) {
          const parsedPosts = JSON.parse(storedPosts);
          setPRIXX(parsedPosts);
          calculateTotalPrice(parsedPosts);
        }
      } catch (error) {
        console.log('Error fetching data:', error); 
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.paymentOptions}>
    <Text>{PRIXX.toFixed(3)}$</Text>
</View>

        <View style={styles.creditCardDetails}>
             <Text style={styles.tit}>Card Number</Text>
          <TextInput
            placeholder=" Entre your Card PAYPAL Number"
            style={styles.input}
            value={formData.card_number}
            onChangeText={(text) => handleChange('card_number', text)}/>
          <Text style={styles.tit}>Expiry	Dates</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Expiry Month"
              style={[styles.input, { width: '45%' }]}
              value={formData.expiry_month}
              onChangeText={(text) => handleChange('expiry_month', text)}/>
            <TextInput
              placeholder="Expiry Year"
              style={[styles.input, { width: '45%' }]}
              value={formData.expiry_year}
              onChangeText={(text) => handleChange('expiry_year', text)}
            />
          </View>
          <Text  style={styles.tit}>CVV</Text>
          <TextInput
            placeholder="CVV code here"
            style={styles.input}
            value={formData.cvv}
            onChangeText={(text) => handleChange('cvv', text)}
          />
        </View>
     
    
   
         <TouchableOpacity style={styles.button} mode="contained"    >
         <Text> Pay Now</Text>
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  button: {
    backgroundColor: '#dba617',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft:150,
    marginVertical:350
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
  creditCardDetails: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
  },
  cvvContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cvvIcon: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
  cvvInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});


export default Paye;
