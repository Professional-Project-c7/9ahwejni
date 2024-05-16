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
      return <Text style={styles.noPaymentsText}>No payment notifications</Text>;
    }
  };
  

  return (
    <ScrollView style={{ flex: 1 }}>
      {displayPayments()}
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
    marginTop:30,
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
    marginTop: 50
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
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  }
});

export default Notification;
