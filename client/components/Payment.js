import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipAdress } from '../config';
import Toast from 'react-native-toast-message';

function PaymentScreen({ navigation }) {
  const [price, setPrice] = useState(0);

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

  const HandleSubmit = async () => {
    try {
      const body = {
        userId: userId, 
        amount: price, 
      };
      const userId = await AsyncStorage.getItem('IdUser');
      await axios.post(`http://${ipAdress}:3000/api/not/`, body);
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const formatCardNumber = (value) => {
    let formattedValue = value.replace(/\D/g, '');
    formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
  };

  const handleSubmit = async () => {
    const { cardNumber, expiryMonth, expiryYear, cvv } = formData;
    if (cardNumber === '' || expiryMonth === '' || expiryYear === '' || cvv === '') {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Information',
        text2: 'Please fill in all fields.'
      });
      return;
    }

    try {
      HandleSubmit();

      const paymentData = {
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        amount: price * 100,
        currency: "EUR"
      };

      const response = await axios.post(`http://${ipAdress}:3000/api/payment/pay`, paymentData);
      
      const userId = await AsyncStorage.getItem('IdUser');
      const paymentConfirmationDate = new Date().toISOString();
      const paymentRecord = {
        confirmationDate: paymentConfirmationDate,
        amount: price.toFixed(2),
        currency: "EUR"
      };

      let existingPayments = await AsyncStorage.getItem(`ALL_PAYMENTS_${userId}`);
      existingPayments = existingPayments ? JSON.parse(existingPayments) : [];

      existingPayments.push(paymentRecord);
      await AsyncStorage.setItem(`ALL_PAYMENTS_${userId}`, JSON.stringify(existingPayments));
      AsyncStorage.removeItem('favorites');
      navigation.navigate('paymentSucces');
      
      setFormData({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
      });
      Toast.show({
        type: 'success',
        text1: 'Payment Successful',
        text2: 'Your payment has been processed successfully.'
      });
    } catch (error) {
      console.log('Payment error:', error);
      Toast.show({
        type: 'error',
        text1: 'Payment Error',
        text2: 'There was an error processing your payment.'
      });
    }
  };

  const goToHomePage = () => {
    navigation.navigate('homePage');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={goToHomePage}>
            <Image
              source={require('../image/logo.png')}
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
              maxLength={19}
            />
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Expiry Month"
                style={[styles.input, styles.inputHalf]}
                value={formData.expiryMonth}
                onChangeText={(text) => handleChange('expiryMonth', text)}
                keyboardType="numeric"
                maxLength={2}
              />
              <TextInput
                placeholder="Expiry Year"
                style={[styles.input, styles.inputHalf]}
                value={formData.expiryYear}
                onChangeText={(text) => handleChange('expiryYear', text)}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            <TextInput
              placeholder="CVV code"
              style={styles.input}
              value={formData.cvv}
              onChangeText={(text) => handleChange('cvv', text)}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
    height:44,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 120,
    height: 60,
  },
  contentContainer: {
    padding: 20,
  },
  paymentCartImage: {
    width: '100%',
    height: 250,
    alignSelf: 'center',
    borderRadius: 35
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  creditCardDetails: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 25,
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
    fontStyle: 'italic',

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    fontStyle: 'italic',

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
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',

  },
});

export default PaymentScreen;
