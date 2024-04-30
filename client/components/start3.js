import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Start3({ navigation }) {

  const navigateToUserAccount = () => {
    navigation.navigate('homePage');
  };
  
  const navigateToUserAccount2 = () => {
    navigation.navigate('st4');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../image/2.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Top performing plumber</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={navigateToUserAccount}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToUserAccount2}>
            <Icon name="arrow-forward" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
  },
  content: {
    marginTop:45,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1, // Adjust aspect ratio if needed
  },
  title: {
    fontSize: 30, // Increased font size
    fontWeight: 'bold',
    marginBottom: 10,
    // color: '#dba617',

  },
  buttonContainer: {
    marginTop:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
   

    fontSize:20, // Increased font size
  },
});

export default Start3;
