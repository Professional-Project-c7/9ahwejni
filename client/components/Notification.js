import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet , ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';






const Notification = ({navigation}) => {
  const [date, setDate] = useState('');
  const [somme, setSomme] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const userId = await AsyncStorage.getItem('IdUser');
        const storedPosts = await AsyncStorage.getItem(`PAYMENT_CONFIRMATION_DATE_${userId}`);
        const sommme = await AsyncStorage.getItem(`PAYMENT_AMOUNT_${userId}`);
          setSomme(sommme);
          setDate(storedPosts)
      } catch (error) {
        console.log('Error fetching data:', error); 
      }
    };
    fetchData();
  }, []);



 
  return (
    <View  style={{ flex: 1 }} >
<ImageBackground 
       source={require('../image/logo.png')}
        style={styles.backgroundImage}>
        
      </ImageBackground>
      <View  style={styles.container}  > 

      <Text style={styles.title}>{somme}$  </Text>
      <Text style={styles.message}>{date}</Text>
    </View>
    <View  style={styles.container}  > 

<Text style={styles.title}>{somme}$  </Text>
<Text style={styles.message}>{date}</Text>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});

export default Notification;
