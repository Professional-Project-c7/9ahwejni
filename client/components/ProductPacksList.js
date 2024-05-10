import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';

import soloPackImage from '../image/soloPack.png';
import duoPackImage from '../image/duoPack.png';
import familyPackImage from '../image/groupPack.png';
const testData = [
  {
    id: '1',
    title: ' Pack  1 ',
    description: 'Premium quality coffee blend for a perfect start to your day.',
    Coffeimage: [
      { uri: 'https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg' },
    ],
    JuiceImage: [
      { uri: 'https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/c5467a25-be83-4fc7-a193-173f78e6dd89_5Sg4yJD.jpg' },
    ],
    CakesImage: [
      { uri: 'https://img.restaurantguru.com/re86-Roots-Coffee-Shop-interior-2022-10.jpg' },
    ],
    CakesImage: [
      { uri: 'https://sugargeekshow.com/wp-content/uploads/2023/10/easy_chocolate_cake_slice.jpg' },
    ],
    subtitle: 'Coffee',
    // rating: 4,
    // reviews: 99,
    price: 4.99,
    available: true 
  },
  {
    id: '2',
    title: 'Pack 2 ',
    description: 'Premium quality coffee blend for a perfect start to your day.',
    Coffeimage: [
      { uri: 'https://img.restaurantguru.com/re86-Roots-Coffee-Shop-interior-2022-10.jpg' },
    ],
    JuiceImage: [
      { uri: 'https://img.restaurantguru.com/re86-Roots-Coffee-Shop-interior-2022-10.jpg' },
    ],
    CakesImage: [
      { uri: 'https://img.restaurantguru.com/re86-Roots-Coffee-Shop-interior-2022-10.jpg' },
    ],
    CakesImage: [
      { uri: 'https://img.restaurantguru.com/re86-Roots-Coffee-Shop-interior-2022-10.jpg' },
    ],
    subtitle: 'Coffee',
    // rating: 4,
    // reviews: 99,
    price: 4.99,
    available: false 
  }
];



const ProductPacksList = () => {
  const [selectedPack, setSelectedPack] = useState(null);


  const togglePack = (packName) => {
    setSelectedPack(selectedPack === packName ? null : packName);
  };

  const renderAvailabilityIndicator = (available) => available ? (
    <Text style={styles.availableText}>Available</Text>
  ) : (
    <Text style={styles.unavailableText}>Out of Stock</Text>
  );
  
  return (
    <ScrollView style={styles.scrollContainer} >
      <View style={styles.container}>
        {/* Solo Pack */}
        <TouchableOpacity onPress={() => togglePack('Solo Pack')} style={styles.pack}>
          <Image source={soloPackImage} style={styles.packImage} />
          <Text style={styles.packTitle}>Solo Pack</Text>
        </TouchableOpacity>
        {selectedPack === 'Solo Pack' && (
        <View style={styles.cards}>
           <ScrollView
  horizontal={true}>
        {testData.map(item => (
          <View key={item.id}>
              <Text style={styles.packTitle}>{item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.Coffeimage.map((image, index) => (
                <Image key={index} source={image} style={styles.packImages} />
              ))}
              {item.JuiceImage.map((image, index) => (
                <Image key={index} source={image} style={styles.packImages} />
              ))}
                </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              {item.CakesImage.map((image, index) => (
                <Image key={index} source={image} style={styles.packImages} />
              ))}
              {item.CakesImage.map((image, index) => (
                <Image key={index} source={image} style={styles.packImages} />
              ))}
                </View>
                <View style={styles.cardDetails}>
                <Text style={styles.carddescription}>{item.description}</Text>
            <Text style={styles.cardprice}>Price: ${item.price.toFixed(2)}</Text>
            {renderAvailabilityIndicator(item.available)}
                </View>

          </View>
        ))}
      </ScrollView>
      </View>
           
        )}

        {/* Duo Pack */}
        <TouchableOpacity onPress={() => togglePack('Duo Pack')} style={styles.pack}>
          <Image source={duoPackImage} style={styles.packImage} />
          <Text style={styles.packTitle}>Duo Pack</Text>
        </TouchableOpacity>
        {selectedPack === 'Duo Pack' && (
    <View style={styles.cards}>
    <ScrollView
horizontal={true}>
 {testData.map(item => (
   <View key={item.id}>
       <Text style={styles.packTitle}>{item.title}</Text>
     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
       {item.Coffeimage.map((image, index) => (
         <Image key={index} source={image} style={styles.packImages} />
       ))}
       {item.JuiceImage.map((image, index) => (
         <Image key={index} source={image} style={styles.packImages} />
       ))}
         </View>
     <View style={{ flexDirection: 'row', alignItems: 'center' }}>

       {item.CakesImage.map((image, index) => (
         <Image key={index} source={image} style={styles.packImages} />
       ))}
       {item.CakesImage.map((image, index) => (
         <Image key={index} source={image} style={styles.packImages} />
       ))}
         </View>
         <View style={styles.cardDetails}>

         <Text style={styles.carddescription}>{item.description}</Text>
            <Text style={styles.cardprice}>Price: ${item.price.toFixed(2)}</Text>
     {renderAvailabilityIndicator(item.available)}
         </View>

   </View>
 ))}
</ScrollView>
</View>
 
        )}

        {/* Family Pack */}
        <TouchableOpacity onPress={() => togglePack('Family Pack')} style={styles.pack}>
          <Image source={familyPackImage} style={styles.packImage} />
          <Text style={styles.packTitle}>Family Pack</Text>
        </TouchableOpacity>
        {selectedPack === 'Family Pack' && (
     <View style={styles.cards}>
           <ScrollView
  horizontal={true}>
        {testData.map(item => (
          <View key={item.id}>
              <Text style={styles.packTitle}>{item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.Coffeimage.map((image, index) => (
                <Image key={index} source={image} style={styles.packImages} />
              ))}
              {item.JuiceImage.map((image, index) => (
                <Image key={index} source={image} style={styles.packImages} />
              ))}
                </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              {item.CakesImage.map((image, index) => (
                <Image key={index} source={image} style={styles.packImages} />
              ))}
              {item.CakesImage.map((image, index) => (
                <Image key={index} source={image} style={styles.packImages} />
              ))}
                </View>
                <View style={styles.cardDetails}>

            <Text style={styles.carddescription}>{item.description}</Text>
            <Text style={styles.cardprice}>Price: ${item.price.toFixed(2)}</Text>
            {renderAvailabilityIndicator(item.available)}
                </View>

          </View>
        ))}
      </ScrollView>
      </View>

       
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  
  },
  container: {
    flex: 1,
    padding: 10,
  },
  pack: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EBE3',
     height : 120 ,
      borderRadius: 10,
  },
  packTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 30,
  },
 
  packImages : {
    width: 160,
    height: 160,
    marginLeft: 20,
    borderRadius : 10,
    marginTop: 10,
   
  } ,
  packImage: {
    width: 90,
    height: 90,
    marginLeft: 10,
    borderRadius : 10,
  },
 
  
  cards : {
   marginBottom : 20 , 
    height: 500,
    width : 380,
    backgroundColor : '#F0EBE3',
    borderRadius : 20
  }, 
 

  cardDetails: { 
    width  : 340,
    marginLeft: 20,
    marginTop: 20,
  },
  carddescription : {
    fontWeight: 'bold',
     fontSize : 17,
     
color : '#322C2B',

  } ,  
  cardprice : {
    fontWeight: 'bold',
color : 'black',
    fontSize : 15,
  },
  availableText: {
    color: 'green',
    fontWeight: 'bold',
  },
  unavailableText: {
    color: 'red',
    fontWeight: 'bold',
  },
  
  

});

export default ProductPacksList;
