import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('IdUser');
        const storedPayments = await AsyncStorage.getItem(`ALL_PAYMENTS_${userId}`);
        if (storedPayments) {
          const parsedPayments = JSON.parse(storedPayments);
          setPaymentData(parsedPayments);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const savePaymentData = async (newPayment) => {
    try {
      const userId = await AsyncStorage.getItem('IdUser');
      const updatedPayments = [...paymentData, newPayment];
      await AsyncStorage.setItem(`ALL_PAYMENTS_${userId}`, JSON.stringify(updatedPayments));
      setPaymentData(updatedPayments);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const displayPayments = () => {
    if (paymentData && paymentData.length > 0) {
      return paymentData.map((payment, index) => (
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
    <View style={{ flex: 1 }}>
      {displayPayments()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    marginTop:50
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 20,
  },
});

export default Notification;
