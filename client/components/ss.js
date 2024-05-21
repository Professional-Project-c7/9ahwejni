import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for close icon
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons for delete icon
import AsyncStorage from '@react-native-async-storage/async-storage';

const Panier = ({ navigation }) => {

  const [posts, setPosts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPosts = await AsyncStorage.getItem('favorites');
        
        if (storedPosts) {
          const parsedPosts = JSON.parse(storedPosts);
          setPosts(parsedPosts);
          calculateTotalPrice(parsedPosts);
        }
      } catch (error) {
        console.log('Error fetching data:', error); 
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = () => {
    navigation.navigate('Tabs');
  };
  const handlepayment = () => {
    AsyncStorage.setItem('PRICE', JSON.stringify(totalPrice))
    navigation.navigate('Paye');
    };
  const handleDeleteItem = async (itemId) => {
    const updatedPosts = posts.filter(item => item.id !== itemId);
    setPosts(updatedPosts);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedPosts));
      calculateTotalPrice(updatedPosts);
    } catch (error) {
      console.log('Error updating favorites:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += item.price;
    });
    setTotalPrice(totalPrice);
  };
  // console.log(totalPrice);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name="arrow-left" size={50} onPress={handleAddToCart} />
      </View>
      <ScrollView>
        <FlatList
          data={posts}
          // keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Image style={styles.cardImage} source={{ uri: item.imgUrl }} />
                <View style={{ marginLeft: 18,marginRight:5 }}>
                  <Text style={styles.time}>{item.createdAt}</Text>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                  <TouchableOpacity  style={styles.delete} onPress={() => handleDeleteItem(item.id)}>
                    <MaterialIcon name="delete" size={27} color="#dba617" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
      <View style={styles.cardd}>
        {/* <Text style={styles.deliveryCharge}>Delivery charge: $1.5</Text>
        <Text style={styles.discount}>Discount: 5%</Text> */}
        <View >
          <Text>Total Price: ${totalPrice.toFixed(3)}</Text>
          
          </View >
      </View>
             <View>
              <TouchableOpacity> 
             <View style={styles.addToCartButton}    >
                                    <Text onPress={handlepayment} >go to Payment</Text>
               </View>                       
              </TouchableOpacity>
              </View>       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  addToCartButton: {
    height: 45,
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: 'white',
    elevation: 13,
    borderRadius: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize:30
  },
  cardd: {
    height: 45,
  // marginVertical: 20,
  marginHorizontal: 10,
  backgroundColor: 'white',
  elevation: 13,
  borderRadius: 10,
  alignItems: 'center', 
  justifyContent: 'center', 
  },








  icon: {
    marginRight: 150,
    width:50
  },


  delete: {
    marginLeft: 230,
  },
  card: {
    marginVertical: 8,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 10,
  },
 
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cardImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  time: {
    fontSize: 13,
    color: 'black',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: 'black',
    marginTop: 5,
  },
  description: {
    color: 'gray',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subtotal: {
    marginBottom: 10,
    marginLeft:115
  },
  deliveryCharge: {
    marginBottom: 10,
    marginLeft:115
  },
  discount: {
    marginBottom: 10,
    marginLeft:115
  },


 
});

export default Panier;