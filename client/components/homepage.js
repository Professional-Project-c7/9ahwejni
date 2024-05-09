import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../components/searchbar';
import { IconButton } from 'react-native-paper';
import RandomProducts from "../components/randomproducts";
import Pub from "../components/pub";
import TopShops from "../components/TopShops";
import axios from 'axios';
import logoImage from "../image/logo.png";
import { ipAdress } from '../config';
import CategoryBar from '../components/categorybar';

const HomePage = ({ navigation }) => {
  const [userData, setUserData] = useState([]);
  const coffeeUsers = userData.filter(user => user.UserType === "coffee");
  const clientUsers = userData.filter(user => user.UserType === "client");





  const firstTwoImages = userData.slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient 
        colors={['rgba(253,190,29,1)', 'rgba(252,145,69,1)']} 
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 0}} 
        style={styles.topBackground}
      >
        <View style={styles.top}>
          <IconButton icon="menu" iconColor='#FFF' />
          <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logo} />
          </View>
          <IconButton icon="cart" iconColor='#FFF' onPress={() => navigation.navigate('panier')} />
        </View>
      </LinearGradient>
      <View style={styles.searchContainer}>
        <SearchBar />
      </View>
      <View style={styles.categoryBarContainer}>
        <Text style={styles.categoryTitle}>Category</Text>
        <CategoryBar />
      </View>
      <Pub />
      <View style={styles.top}>
        <Text style={[styles.Texttitlecoffee, { marginLeft: 0 }]}>Products of the Day!</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllCoffees")}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
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
              <Image source={{ uri: item.ImageUrl }} style={styles.imageCoffee}  />
            </View>
            <View style={styles.titleBox}>
              <Text style={styles.titleCoffee}     >{item.FirstName} {item.LastName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <RandomProducts />
      <View style={styles.top}>
        <Text style={[styles.Texttitlecoffee, { marginLeft: 0 }]}>Top Rated Coffee Shops of the Day!</Text>
      </View>
      <TopShops />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBackground: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    paddingVertical: 10,
  },
  searchContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  logoContainer: {
    width: 82,
    height: 79,
    borderRadius: 28,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 66,
    height: 66,
  },
  categoryBarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginRight: 30,
    left: 14
  },
  categoryTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    justifyContent: 'center',
    right : 15},
    Texttitlecoffee: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Montserrat',
      color: '#dba617',
      textAlign: 'center',
      marginTop: 40,
      marginLeft: 20,
      flex: 1,
    },
    seeAllText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#dba617',
      marginTop: 40,
      marginRight: 20,
    },
    card: {
      width: 180,
      height: 140,
      marginLeft: 9,
      marginRight: 5,
      marginTop: 15,
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
  });
  
  export default HomePage;