import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('IdUser');
        const storedPayments = await AsyncStorage.getItem(`ALL_PAYMENTS_${userId}`);
        if (storedPayments) {
          const parsedPayments = JSON.parse(storedPayments);
          setPaymentData(parsedPayments);
          calculateTotalPrice(parsedPayments);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const calculateTotalPrice = (payments) => {
    const total = payments.reduce((acc, payment) => acc + payment.amount, 0);
    setTotalPrice(total);
  };

  const savePaymentData = async (newPayment) => {
    try {
      const userId = await AsyncStorage.getItem('IdUser');
      const updatedPayments = [...paymentData, newPayment];
      await AsyncStorage.setItem(`ALL_PAYMENTS_${userId}`, JSON.stringify(updatedPayments));
      setPaymentData(updatedPayments);
      calculateTotalPrice(updatedPayments);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const displayPayments = () => {
    const reversedPayments = paymentData.slice().reverse(); // Create a copy and reverse it
    
    if (reversedPayments && reversedPayments.length > 0) {
      return reversedPayments.map((payment, index) => (
        <View key={index} style={styles.container}>
          <Text style={styles.title}>{payment.amount}$</Text>
          <Text style={styles.message}>{payment.confirmationDate}</Text>
        </View>
      ));
    } else {
      return <Text>No payment notifications</Text>;
    }
  };
  

  return (
    <ScrollView style={{ flex: 1 }}>
      {displayPayments()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 50
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 20,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  }
});

export default Notification;
