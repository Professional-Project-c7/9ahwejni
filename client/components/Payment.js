import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet , Linking  } from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-paper';

import creditCardLogo from '../image/master.jpg';
import paypalLogo from '../image/paypal.png';
import visaCardLogo from '../image/visa.png';
import { ipAdress } from '../config';

function Paye() {
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
  const handlePayment = async () => {
    // try {
    //   const amount = 500; 
    //   const response = await axios.post(
    //     `http://${ipAdress}/api/payment/pay/`,
    //     { amount: amount } 
    //   );
    //   console.log(response);
    //   const paymentLink = response.data.result.link;
    //   Linking.openURL(paymentLink);
    // } catch (error) {
    //   console.log(error);
    // }
    Linking.openURL("https://flouci.com/pay/L-z8kC4VR8y8Hyn8z7nu0A");
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment method</Text>
      <View style={styles.paymentOptions}>
        <TouchableOpacity onPress={() => handleChange('payment_method', 'Flouci')}>
          <Image source={creditCardLogo} style={styles.logo} />
          <Text>Flouci</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('payment_method', 'paypal')}>
          <Image source={paypalLogo} style={styles.logo} />
          <Text>PayPal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('payment_method', 'visa_card')}>
          <Image source={visaCardLogo} style={styles.logo} />
          <Text>Visa Card</Text>
        </TouchableOpacity>
      
      </View>
      {formData.payment_method === 'Flouci' && (
        <View style={styles.creditCardDetails}>
             <Text style={styles.tit}>Card Number</Text>
          <TextInput
            placeholder=" Entre your Card  Flouci Number"
            style={styles.input}
            value={formData.card_number}
            onChangeText={(text) => handleChange('card_number', text)}
          />
          <Text style={styles.tit}>Expiry	Dates</Text>

          <View style={styles.inputContainer}>
            
            <TextInput
            
              placeholder="Expiry Month"
              style={[styles.input, { width: '45%' }]}
              value={formData.expiry_month}
              onChangeText={(text) => handleChange('expiry_month', text)}
            />
                    

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
      )}
     {formData.payment_method === 'paypal' && (
        <View style={styles.creditCardDetails}>
             <Text style={styles.tit}>Card Number</Text>
          <TextInput
            placeholder=" Entre your Card PAYPAL Number"
            style={styles.input}
            value={formData.card_number}
            onChangeText={(text) => handleChange('card_number', text)}
          />
          <Text style={styles.tit}>Expiry	Dates</Text>

          <View style={styles.inputContainer}>
            
            <TextInput
            
              placeholder="Expiry Month"
              style={[styles.input, { width: '45%' }]}
              value={formData.expiry_month}
              onChangeText={(text) => handleChange('expiry_month', text)}
            />
                    

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
      )}
       {formData.payment_method === 'visa_card' && (
        <View style={styles.creditCardDetails}>
             <Text style={styles.tit}>Card Number</Text>
          <TextInput
            placeholder=" Entre your Card VISA  Number"
            style={styles.input}
            value={formData.card_number}
            onChangeText={(text) => handleChange('card_number', text)}
          />
          <Text style={styles.tit}>Expiry	Dates</Text>

          <View style={styles.inputContainer}>
            
            <TextInput
            
              placeholder="Expiry Month"
              style={[styles.input, { width: '45%' }]}
              value={formData.expiry_month}
              onChangeText={(text) => handleChange('expiry_month', text)}
            />
                    

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
      )}
   
         <TouchableOpacity style={styles.button} mode="contained"   onPress={handlePayment} >
        
         <Text> Pay Now</Text>
      </TouchableOpacity>
      {/* <Button title="Pay Now" style={styles.pay}  onPress={handlePayment}  /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#dba617',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 25,
  },
  tit:{
   

fontSize:20

  },


  header: {
    color: '#dba617',

    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 25,
    marginLeft:25
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    marginBottom:10,
    width: 100,
    height: 50,
  },
  creditCardDetails: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dba617',
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Paye;
