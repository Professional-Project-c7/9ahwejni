import AsyncStorage from '@react-native-async-storage/async-storage';

export const updatePaymentHistory = async (userId, paymentRecord) => {
  try {
    let existingPayments = await AsyncStorage.getItem(`ALL_PAYMENTS_${userId}`);
    existingPayments = existingPayments ? JSON.parse(existingPayments) : [];
    existingPayments.push(paymentRecord);
    await AsyncStorage.setItem(`ALL_PAYMENTS_${userId}`, JSON.stringify(existingPayments));
  } catch (error) {
    console.log('Error updating payment history:', error);
  }
};

export const getCoffeeUserId = async () => {
  try {
    const coffeeUserId = await AsyncStorage.getItem('CoffeeUserId');
    return coffeeUserId;
  } catch (error) {
    console.log('Error fetching coffee user ID:', error);
  }
  return null;
};
