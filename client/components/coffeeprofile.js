import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView,ImageBackground } from 'react-native';
import { IconButton } from 'react-native-paper';
import AddPacks from './addpacks';
import addProducts from './addproducts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MyComponent = ({navigation}) => {
    
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
        <ImageBackground source={{ uri: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' }} style={styles.profileImage}>
  {/* Text on the left */}
  <View style={styles.leftTextContainer}>
  <View style={styles.textWithIcon}>
    <Text style={styles.textrate}>4.5</Text>
    <IconButton icon="star" iconColor='#dba617' size={23} style={styles.starIcon} />
  </View>
</View>

  {/* Text on the right */}
  <View style={styles.rightTextContainer}>
  <View style={styles.textWithIcon}>
    <IconButton icon="google-maps" iconColor='#dba617' size={23} style={styles.locIcon} />
    <Text style={styles.textloc}>Gabes</Text>
  </View>
</View>
  <IconButton icon="keyboard-backspace" iconColor='#dba617' size={35} style={styles.backIcon} />
</ImageBackground>

        </View>
       

        <View style={styles.profileInfo}>
          <Text style={styles.name}>COFFEESHOP</Text>
        </View>
        <View style={styles.optionsContainerOne}>
        <TouchableOpacity style={styles.optionOne} onPress={() => navigation.navigate('InfoCoffee')}>
  <View style={styles.optionContent}>
    <Image source={require("../image/profile.png")} style={styles.optionImageE} />
    <Text style={styles.optionText}>INFORMATIONS</Text>
  </View>
</TouchableOpacity>
          
<TouchableOpacity style={styles.optionOne} onPress={() => navigation.navigate('InfoCoffee')}>
  <View style={styles.optionContent}>
    <Image source={require("../image/availability.png")} style={styles.optionImageE} />
    <Text style={styles.optionText}>AVAILABILITY</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity style={styles.optionOne} onPress={() => navigation.navigate('InfoCoffee')}>
  <View style={styles.optionContent}>
    <Image source={require("../image/settings.png")} style={styles.optionImageE} />
    <Text style={styles.optionText}>SETTINGS</Text>
  </View>
</TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AddPacks')}>
            <View style={styles.test} >
            <Image source={require("../image/packs.png")} style={styles.optionImage} /></View>
            <Text style={styles.optionText} >ADD PACKS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AddProducts')}>
          <View style={styles.test} >
            <Image source={require("../image/coffee-cup.png")} style={styles.optionImage} /></View>
            <Text style={styles.optionText}>ADD PRODUCTS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Orders')}>
          <View style={styles.test} >
            <Image source={require("../image/online-order.png")} style={styles.optionImage} /></View>
            <Text style={styles.optionText}>ORDERS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ReviewsCoffee')}>
          <View style={styles.test} >
            <Image source={require("../image/reviews.png")} style={styles.optionImage} /></View>
            <Text style={styles.optionText}>REVIEWS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option } onPress={() => navigation.navigate('PaymentCardsDetails')}>
          <View style={styles.test} >
            <Image source={require("../image/credit-card.png")} style={styles.optionImage} /></View>
            <Text style={styles.optionText}>PAYMENT DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TransactionScreenCoffee')}>
          <View style={styles.test} >
            <Image source={require("../image/transaction.png")} style={styles.optionImage} /></View>
            <Text style={styles.optionText}>TRANSACTIONS</Text>
          </TouchableOpacity>
        </View>
        
        {/* Add more options here */}
        <View style={styles.logout}>
        <TouchableOpacity style={styles.optionOne} onPress={() => navigation.navigate('InfoCoffee')}>
  <View style={styles.optionContent}>
    <Image source={require("../image/logout.png")} style={styles.optionImageE} />
    <Text style={styles.optionText}>LOG OUT  </Text>
  </View>
</TouchableOpacity>
      </View>
      </View>
      
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  test :{
    backgroundColor: 'white',
  },
    textWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
      },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#dba617',
  },
  profileImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  profileInfo: {
    alignItems: 'center',
    // padding: 16,
//     backgroundImage: 'url("https://as1.ftcdn.net/v2/jpg/01/64/55/04/1000_F_164550456_vWCyP4t3VtCUeYIb09IxYB1WAwj3cEvO.jpg")',
//     backgroundSize: 'cover', 
//     backgroundPosition: 'center', 
},
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color:"black"
  },
  expense: {
    fontSize: 18,
    marginTop: 8,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "rgba(219, 219, 219, 0.8)",
    padding: 16,
    margin:20,
    borderRadius: 10,
  },
  optionsContainerOne: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginLeft:40,
    marginRight:40,
    marginTop:30,
    marginBottom:30,
    padding: 16,
    // backgroundColor: "rgba(219, 219, 219, 0.8)",
    borderRadius: 10,
  },
  logout: {
   
    marginLeft:40,
    marginRight:40,
    marginTop:30,
    marginBottom:30,
    padding: 16,
    // backgroundColor: "rgba(219, 219, 219, 0.8)",
    borderRadius: 10,
    width:250
  },
  option: {
    flex: 1,
    margin: 8,
    backgroundColor: '#dba617',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionOne: {
    
    flex: 1,
    margin: 8,
    backgroundColor: '#dba617',
    borderRadius: 50,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionImage: {
    width: 80, // Adjust the width of the image
    height: 60, // Adjust the height of the image
    alignSelf: 'center', // Center the image horizontally
    marginBottom: 10, // Add margin to separate image from text
    resizeMode: 'contain', // Ensure the image fits within its container
    marginTop:20,
    
  },
  optionImageE: {
    width: 80, // Adjust the width of the image
    height: 30, // Adjust the height of the image
    alignSelf: 'center', // Center the image horizontally
    marginBottom: 10, // Add margin to separate image from text
    resizeMode: 'contain', // Ensure the image fits within its container
    marginTop:10,
    
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    color: '#ffffff',
    marginRight:20
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
    width: '40%',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 40,
    marginLeft: 36,
  },
  logoutText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginLeft: 16,
  },
  leftTextContainer: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    height:30,
    width:70
  },
 
  rightTextContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    
    padding: 5,
    height:30,
    width:80
  },
  textrate: {
    color: '#dba617',
    top:-15,
    right:-7,
    fontSize:17
  },
  starIcon: {
    left:-5,
      top:-15

    },
    textloc: {
        color: '#dba617',
        top:-15,
        right:32,
        fontSize:17
      },
      locIcon: {
        left:-18,
          top:-15
    
        }
  
});

export default MyComponent;
