import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,FlatList,Image,ScrollView} from 'react-native';



const data = [
  {
    id: '1',
    title: 'Familial Breakfast',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: require("../image/breakfast.webp"),
    rating: 4,
    reviews: 99,
    price: 24.99
  },
  {
    id: '2',
    title: 'Familial Breakfast',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: require("../image/breakfast.webp"),
    rating: 4,
    reviews: 99,
    price: 24.99
  },
  {
    id: '3',
    title: 'Familial Breakfast',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: require("../image/breakfast.webp"),
    rating: 4,
    reviews: 99,
    price: 24.99
  },
  {
    id: '4',
    title: 'Familial Breakfast',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: require("../image/breakfast.webp"),
    rating: 4,
    reviews: 99,
    price: 24.99
  },
  {
    id: '5',
    title: 'Familial Breakfast',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: require("../image/breakfast.webp"),
    rating: 4,
    reviews: 99,
    price: 24.99
  },
];
const Twopacks = data.slice(0, 2);
const PackList = () => {
  return (
    <ScrollView>
      <View style={styles.top}>
        <Text style={styles.Texttitlepacks} >Coffee's List</Text>
        <Text style={styles.seeAllpacks} >See All</Text>
      </View>
    <View style={styles.container}>
      <FlatList
        data={Twopacks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image source={item.image} style={styles.cardImg} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDetails}>{item.description}</Text>
              <Text style={styles.cardDetails}>Price: {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 10,
    marginHorizontal: 5,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardImgWrapper: {
    height:120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  cardInfo: {
    
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  Texttitlepacks: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: '#dba617',
    textAlign: 'center',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20
  },
  seeAllpacks: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dba617',
    marginTop: 40,
    marginRight: 20
  },
});


export default PackList;

