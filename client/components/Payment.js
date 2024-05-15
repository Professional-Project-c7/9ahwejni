import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import from React Navigation

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipAdress } from '../config';

function PaymentScreen({navigation}) {
  // const navigation = useNavigation(); 

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

  const formatCardNumber = (value) => {
    // Remove non-digit characters
    let formattedValue = value.replace(/\D/g, '');
    // Insert a space every four characters
    formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
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
        amount: price * 100,
        currency: "EUR"
      };
  
      // Send payment request
      const response = await axios.post(`http://${ipAdress}:3000/api/payment/pay`, paymentData);
      console.log(response.data);
  
      // Store payment confirmation locally
      const userId = await AsyncStorage.getItem('IdUser');
      const paymentConfirmationDate = new Date().toISOString();
      const paymentRecord = {
        confirmationDate: paymentConfirmationDate,
        amount: price.toFixed(2),
        currency: "EUR"
      };
  
      // Retrieve existing payments
      let existingPayments = await AsyncStorage.getItem(`ALL_PAYMENTS_${userId}`);
      existingPayments = existingPayments ? JSON.parse(existingPayments) : [];
  
      // Append new payment record
      existingPayments.push(paymentRecord);
  
      // Store updated payments in AsyncStorage
      await AsyncStorage.setItem(`ALL_PAYMENTS_${userId}`, JSON.stringify(existingPayments));
      AsyncStorage.removeItem('favorites')
  
      // Display payment confirmation
      setPaymentConfirmed(true);
      setFormData({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
      });
    } catch (error) {
      console.log('Payment error:', error);
    }
  };
  
  // Navigation function to home page
  const goToHomePage = () => {
    navigation.navigate('homePage'); // Assuming 'Home' is the name of your home page screen
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : null}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={goToHomePage}>
            <Image
              source={require('../image/logo.png')} // Assuming 'logo.png' is your logo file
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image
            source={require('../image/card.png')}
            style={styles.paymentCartImage}
            resizeMode="contain"
          />
          <View style={styles.paymentOptions}>
            <Text style={styles.cardHeader}>Total Price: {price.toFixed(2)}$</Text>
          </View>
          <View style={styles.creditCardDetails}>
            <TextInput
              placeholder="Enter your Card Number"
              style={styles.input}
              value={formatCardNumber(formData.cardNumber)}
              onChangeText={(text) => handleChange('cardNumber', text)}
              keyboardType="numeric"
              maxLength={19} // maximum 16 digits + 3 spaces
            />
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Expiry Month / DAY"
                style={[styles.input, styles.inputHalf]}
                value={formData.expiryMonth}
                onChangeText={(text) => handleChange('expiryMonth', text)}
                keyboardType="numeric"
                maxLength={4}
              />
              <TextInput
                placeholder="Expiry Year"
                style={[styles.input, styles.inputHalf]}
                value={formData.expiryYear}
                onChangeText={(text) => handleChange('expiryYear', text)}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
            <TextInput
              placeholder="CVV code here"
              style={styles.input}
              value={formData.cvv}
              onChangeText={(text) => handleChange('cvv', text)}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text>Pay Now</Text>
          </TouchableOpacity>
          {paymentConfirmed && <Text style={styles.paymentConfirmation}>Payment is confirmed</Text>}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 120,
    height: 60,
  },
  // contentContainer: {
  //   padding: 20,
  // },
  paymentCartImage: {
    width: '100%',
    height: 250,
    alignSelf: 'center',
   
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  creditCardDetails: {
    backgroundColor: '#fff',
    borderRadius: 10,
   
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
  button: {
    backgroundColor: '#dba617',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 25,
  },
  paymentConfirmation: {
    textAlign: 'center',
    color: 'green',
    marginTop: 10,
  },
});

export default PaymentScreen;
