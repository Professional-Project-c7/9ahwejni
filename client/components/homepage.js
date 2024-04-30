import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView, FlatList, StatusBar,Button } from 'react-native';
import SearchBar from '../components/searchbar';
import hamburgerIcon from '../image/hamburger.png';
import notifIcon from '../image/notif.png';
import { IconButton } from 'react-native-paper';
// import Promopage from './promopage';
import RandomProducts from "../components/randomproducts"
import Pub from "../components/pub"
// import { useNavigation } from '@react-navigation/native';


const images = [
  { id: 1, image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png', title: 'coffeeshop name' },
  { id: 2, image: 'https://t4.ftcdn.net/jpg/01/16/61/93/360_F_116619399_YA611bKNOW35ffK0OiyuaOcjAgXgKBui.jpg', title: 'coffeeshop name' },
  { id: 3, image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png', title: 'coffeeshop name' },
  { id: 4, image: 'https://t4.ftcdn.net/jpg/01/16/61/93/360_F_116619399_YA611bKNOW35ffK0OiyuaOcjAgXgKBui.jpg', title: 'coffeeshop name' },
  { id: 5, image: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png', title: 'coffeeshop name' },
  { id: 6, image: 'https://t4.ftcdn.net/jpg/01/16/61/93/360_F_116619399_YA611bKNOW35ffK0OiyuaOcjAgXgKBui.jpg', title: 'coffeeshop name' },
];

const IMAGE_WIDTH = 250; 
const FOCUSED_IMAGE_WIDTH = 370;
const bars = [
  { id: 1, bar: 'bar1' },
  { id: 2, bar: 'bar2' },
  { id: 3, bar: 'bar3' },
  { id: 4, bar: 'bar4' },
  { id: 5, bar: 'bar5' },
];

function HomePage({ navigation }) {
 
    const [focusedIndex, setFocusedIndex] = useState(0);
    const flatListRef = useRef(null);
    
    const handleScroll = (event) => {
      const { contentOffset } = event.nativeEvent;
      const index = Math.floor(contentOffset.x / IMAGE_WIDTH);
      setFocusedIndex(index);
    };
    const navigateTomenu = () => {
      navigation.navigate('menu'); 
    };
    const renderItem = ({ item, index }) => {
      const imageWidth = index === focusedIndex ? FOCUSED_IMAGE_WIDTH : IMAGE_WIDTH;
  
      return (
        <TouchableOpacity style={[styles.cardprom, { width: imageWidth }]} onPress={() => flatListRef.current.scrollToIndex({ animated: true, index })}>
          <View style={styles.imageBoxprom}>
            <Image source={{ uri: item.image }} style={[styles.imageCoffeeprom, { width: '100%', height: '100%' }]} />
          </View>
          <View style={styles.titleBoxprom}>
            <Text style={styles.titleCoffee}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    };
  
   
  
  const firstTwoImages = images.slice(0, 3); // Get the first two images

  return (
    
    <ScrollView style={styles.container}>
       <View style={styles.top}>
        {/* <Image source={hamburgerIcon} style={{ width: 30, height: 30 }} /> */}
        {/* onPress={()=>navigateTomenu()}  */}
        <IconButton icon="menu" iconColor='#dba617'  />
        <IconButton icon="bell-outline" iconColor='#dba617'  />
      </View>
      <SearchBar />
      <Pub/>
    {/* <View style={styles.containerprom}>
    <FlatList
      ref={flatListRef}
      data={images}
      horizontal
      snapToInterval={IMAGE_WIDTH}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      onScroll={handleScroll}
    />
    <StatusBar style="auto" />
  </View> 
    <View > */}
     
      
      <View style={styles.top}>
      <Text style={styles.Texttitlecoffee} >Coffee's List</Text>
      <Text style={styles.seeAllText} >See All</Text>
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
              <Image source={{ uri: item.image }} style={styles.imageCoffee} />
              
            </View>
            <View style={styles.titleBox}>
              <Text style={styles.titleCoffee}>{item.title}</Text>
            
            </View>
          </TouchableOpacity>
        )}
      />
      
      <StatusBar style="auto" />
      <RandomProducts />
    {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerprom: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  cardprom: {
    height: 200,
    marginLeft: 9,
    marginRight: 40,
    marginTop: 15,
    alignItems: 'center',
  },
  imageBoxprom: {
    width: '100%',
    height: '80%', // Adjust image height as needed
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageCoffeeprom: {
    resizeMode: 'cover',
  },
  titleBoxprom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  Texttitlecoffee: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: '#dba617',
    textAlign: 'center', // Center the text horizontally
    marginTop: 40, // Add some margin at the top
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft:20
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dba617', // Black text color
    marginTop: 40,
    marginRight:20
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10, // Adjust top padding as needed
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  card: {
    width: 180,
    height:140,
    marginLeft: 9,
    marginRight: 5,
    marginTop:15
  },
  imageBox: {
    width: '100%', // Make image box fill its parent
    height: '100%', // Make image box fill its parent
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageCoffee: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loveButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  titleBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleCoffee: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', // Center the text horizontally
    

  },
  seeAllButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // Grey background color
    paddingVertical: 10,
  },
 
});

export default HomePage;
