import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
        <View key={index} style={styles.paymentContainer}>
          <View style={styles.paymentHeader}>
            <Text style={styles.amount}>{payment.amount}$</Text>
          </View>
          <Text style={styles.date}>{payment.confirmationDate}</Text>
        </View>
      ));
    } else {
      return <Text style={styles.noPaymentsText}>No payment notifications</Text>;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {displayPayments()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  amount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#777',
  },
  noPaymentsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Notification;
