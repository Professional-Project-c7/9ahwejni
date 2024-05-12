import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert , DatePickerIOS  } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipAdress } from '../config';

function PaymentScreen() {
  const [price, setPrice] = useState(0);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPrice = await AsyncStorage.getItem('PRICE');
        if (storedPrice) {
          const parsedPrice = JSON.parse(storedPrice);
          setPrice(parsedPrice);
        }
      } catch (error) {
        console.log('Error fetching data:', error); 
      }
    };
    fetchData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    const { cardNumber, expiryMonth, expiryYear, cvv } = formData;
    if (cardNumber === '' || expiryMonth === '' || expiryYear === '' || cvv === '') {
      Alert.alert('Incomplete Information', 'Please fill in all fields.');
      return;
    }
  
    try {
      const paymentData = {
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        amount: price * 100, // Convert to cents
        currency: "EUR"
      };
      const response = await axios.post(`http://${ipAdress}:3000/api/payment/pay`, paymentData);
      console.log(response.data);
      
      // Store the payment confirmation date and price in AsyncStorage
      const paymentConfirmationDate = new Date().toISOString();
      await AsyncStorage.setItem('PAYMENT_CONFIRMATION_DATE', paymentConfirmationDate);
      await AsyncStorage.setItem('PAYMENT_AMOUNT', JSON.stringify(price));
  
      setPaymentConfirmed(true); // Set payment confirmation status
      setFormData({  // Clear the input fields
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
      });
    } catch (error) {            
      console.log('Payment error:', error);  
      // Handle payment error here
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.paymentOptions}>
        <Text style={styles.cardHeader}>Total Price:{price.toFixed(2)}$</Text>
      </View>
      <View style={styles.creditCardDetails}>
        <TextInput
          placeholder="Enter your Card Number"
          style={styles.input}
          value={formData.cardNumber}
          onChangeText={(text) => handleChange('cardNumber', text)}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Expiry Month / DAY"
            style={[styles.input, styles.inputHalf]}
            value={formData.expiryMonth}
            onChangeText={(text) => handleChange('expiryMonth', text)}
          />
          <TextInput
            placeholder="Expiry Year"
            style={[styles.input, styles.inputHalf]}
            value={formData.expiryYear}
            onChangeText={(text) => handleChange('expiryYear', text)}
          />
        </View>
        <TextInput
          placeholder="CVV code here"
          style={styles.input}
          value={formData.cvv}
          onChangeText={(text) => handleChange('cvv', text)}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text>Pay Now</Text>
      </TouchableOpacity>
      {paymentConfirmed && <Text style={styles.paymentConfirmation}>Payment is confirmed</Text>}
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
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  cardHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop:50,
    marginLeft:80
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
  paymentConfirmation: {
    textAlign: 'center',
    color: 'green',
    marginTop: 10,
  },
});



export default PaymentScreen;
