import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const data = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description for Product 1',
    imagelink_square: require("../image/breakfast.webp"),
    prices: [
      { size: 'S', price: '10', currency: '$' },
      { size: 'M', price: '15', currency: '$' },
      { size: 'L', price: '20', currency: '$' },
    ],
    average_rating: 4,
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description for Product 2',
    imagelink_square: require("../image/breakfast.webp"),
    prices: [
      { size: 'S', price: '12', currency: '$' },
      { size: 'M', price: '18', currency: '$' },
      { size: 'L', price: '24', currency: '$' },
    ],
    average_rating: 3,
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'Description for Product 3',
    imagelink_square: require("../image/breakfast.webp"),
    prices: [
      { size: 'S', price: '8', currency: '$' },
      { size: 'M', price: '12', currency: '$' },
      { size: 'L', price: '16', currency: '$' },
    ],
    average_rating: 5,
  },
];

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={product.imagelink_square} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>
          {product.prices[0].currency}
          {product.prices[0].price}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.size}>Size: {product.prices[0].size}</Text>
          <Text style={styles.rating}>Rating: {product.average_rating}</Text>
        </View>
      </View>
    </View>
  );
};

const ProductList = () => {
  const { colors } = useTheme();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [imgUrl, setimgUrl] = useState('https://cdn.vox-cdn.com/thumbor/6kLvmWfhU4h64EhC0S6tsn714fI=/0x0:4032x3024/1200x900/filters:focal(1694x1190:2338x1834)/cdn.vox-cdn.com/uploads/chorus_image/image/59740845/IMG_1503.42.jpg');

  const [userID, setUserID] = useState(0);

  console.log(productName);
  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('IdUser');
      if (value !== null) {
        const tokenObject = JSON.parse(value);
        const userId = tokenObject; 
        console.log("taww",userId);
        setUserID(userId);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  

 
const handleAddProduct = async () => {
  try {
    if (!userID) {
      console.error('User ID not found.');
      return;
    }
console.log("before" ,userID);
    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      userId: userID,
      imgUrl:imgUrl
    };

    const response = await axios.post(`http://${ipAdress}:3000/api/product`, newProduct);
    console.log('Product added successfully:', response.data);

    
    setProductName('');
    setProductDescription('');
    setProductSize('');
    setProductPrice('');
  } catch (error) {
    console.error('Error adding product:', error);
  }
};


  return (
    <ScrollView>
      <View>
        <View style={styles.top}>
          <Text style={styles.Texttitlepacks} >Products's List</Text>
          <Text style={styles.seeAllpacks} >See All</Text>
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
          />
        </SafeAreaView>
        <View style={styles.container}>
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <TouchableOpacity >
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={require("../image/square.png")}
                  style={{ height: 120, width: 125 }}
                  imageStyle={{ borderRadius: 15 }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="camera"
                      size={35}
                      color='#dba617'
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
              Add Product Photo
            </Text>
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={'#dba617'} size={20} />
            <TextInput
            
              placeholder="Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={productName}
              onChangeText={setProductName}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="file-text" color={'#dba617'} size={20} />
            <TextInput
              placeholder="Description"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={productDescription}
              onChangeText={setProductDescription}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="expand" color={'#dba617'} size={20} />
            <TextInput
              placeholder="Size"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={productSize}
              onChangeText={setProductSize}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="dollar" color={'#dba617'} size={20} />
            <TextInput
              placeholder="Price"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={productPrice}
              onChangeText={setProductPrice}
            />
          </View>
          <TouchableOpacity style={styles.commandButton} onPress={handleAddProduct}>
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    backgroundColor: 'white',
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
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#EFECEC',
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop:7,
    marginLeft:7
  },
  details: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
   color:'#dba617'
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#f85c24',
    marginBottom: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  size: {
    fontSize: 14,
    color: '#444',
  },
  rating: {
    fontSize: 14,
    color: '#444',
  },
  addProductContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0', // Example background color
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageBackground: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
  commandButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#dba617',
    alignItems: 'center',
  },
  commandButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  panel: {
    padding: 20,
    backgroundColor: '#fff',
  },
  panelTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  panelSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});

export default ProductList;
