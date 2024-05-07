import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, StatusBar } from 'react-native';
import SearchBar from '../components/searchbar';
import { IconButton } from 'react-native-paper';
import RandomProducts from "../components/randomproducts";
import Pub from "../components/pub";
import axios from 'axios';
import logoImage from "../image/logo.png";
import { ipAdress } from '../config';
import CategoryBar from '../../categorybar'; 
// import Toast from 'react-native-toast-message';

const HomePage = ({ navigation }) => {
  const [userData, setUserData] = useState([]);
  const coffeeUsers = userData.filter(user => user.UserType === "coffee");
  const clientUsers = userData.filter(user => user.UserType === "client");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/user/`);
        const coffeeUsers = response.data.filter(user => user.UserType === "coffee");
        setUserData(coffeeUsers);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const firstTwoImages = userData.slice(0, 3);
  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <IconButton icon="menu" iconColor='#dba617' />
        <Image source={logoImage} style={styles.logo}  />
        <IconButton icon="bell-outline" iconColor='#dba617' />
      </View>
      <SearchBar />
      <View style={styles.categoryBarContainer}>
        <Text style={styles.categoryTitle}>Category</Text>
        <CategoryBar />
      </View>
      <Pub />
      <View style={styles.top}>
        <Text style={styles.Texttitlecoffee}>Top rated coffees of the day!</Text>
        {/* <Text style={styles.seeAllText}>See All</Text>  */}
      </View>
      <FlatList
        data={firstTwoImages}
        horizontal
        snapToInterval={56}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.imageBox}>
              <Image source={{ uri: item.ImageUrl }} style={styles.imageCoffee} />
            </View>
            <View style={styles.titleBox}>
              <Text style={styles.titleCoffee}>{item.FirstName} {item.LastName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <RandomProducts />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  categoryBarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginRight: 30, // Adjusted the left margin to ensure visibility
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  Texttitlecoffee: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: '#dba617',
    textAlign: 'center',
    marginTop: 40,
    marginLeft: 20
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dba617',
    marginTop: 40,
    marginRight: 20
  },
  card: {
    width: 180,
    height: 140,
    marginLeft: 9,
    marginRight: 5,
    marginTop: 15
  },
  imageBox: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageCoffee: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(219, 166, 23, 0.4)",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleCoffee: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  logo: {
    width: 60,
    height: 60,
   
  },
  
});

export default HomePage;
