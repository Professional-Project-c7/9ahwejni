import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { useTheme,IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const PackCard = ({ pack }) => {
  return (
    <View style={styles.card}>
    <Image source={pack.imagelink_square} style={styles.image} />
    <View style={styles.details}>
      <Text style={styles.name}>{pack.name}</Text>
      <Text style={styles.description}>{pack.description}</Text>
      <Text style={styles.price}>{pack.price} $</Text>
        {/* Render products associated with the pack */}
        {pack.prods.map((product, index) => (
        <ScrollView key={index} contentContainerStyle={styles.productContainer}>
        <Image source={{uri:product.imgUrl}} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>{product.price} $</Text>
        </View>
      </ScrollView>
      
      
        ))}
        <View style={styles.bottomRow}>
          {/* <Text style={styles.size}>Size: {product.prices[0].size}</Text> */}
          {/* <Text style={styles.rating}>Rating: {product.average_rating}</Text> */}
        </View>
      </View>
    </View>
  );
};


const AddPacks = ({navigation}) => {
  const { colors } = useTheme();
  const [packName, setpackName] = useState('');
  const [packDescription, setpackDescription] = useState('');
  const [packSize, setpackSize] = useState('');
  const [packPrice, setpackPrice] = useState('');
  const [userID, setUserID] = useState(0);
  const [array, setarray] = useState([]);
  const [userpacks, setUserpacks] = useState(null);
  console.log(userID);
  useEffect(() => {
    retrieveData();
    getArrayOfProductsIds()
  }, []);
  // console.log("userpacks",userpacks);
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

  useEffect(() => {
    const getUserpacks = async (userId) => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/packs`);
        if (response.status === 200) {
          setUserpacks(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (userID) {
      getUserpacks(userID);
    }
  }, [userID]);

  const getArrayOfProductsIds = async () => {
    try {
      const res = await  AsyncStorage.getItem('ArrayOfProductsIds');
      console.log("array getted",res);
      console.log("array getted",JSON.parse(res));
      setarray(JSON.parse(res))

    } catch (error) {
      console.error('Error getted array:', error);
    }
  };
  


const handleAddpack = async () => {
  try {
    if (!userID) {
      console.error('User ID not found.');
      return;
    }
    getArrayOfProductsIds()
    console.log("array" ,array);
console.log("before" ,userID);
    const newpack = {
      name: packName,
      description: packDescription,
      price: packPrice,
      userId: userID,
      checkedProductIDs:array
    };

    const response = await axios.post(`http://${ipAdress}:3000/api/packs`, newpack);
    console.log('pack added successfully:', response.data);

    
    setpackName('');
    setpackDescription('');
    setpackSize('');
    setpackPrice('');
  } catch (error) {
    console.error('Error adding pack:', error);
  }
};
const removeArrayFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('ArrayOfProductsIds');
    console.log('array removed successfully');
  } catch (error) {
    console.error('Error removing array:', error);
  }
};

const handleremovearray = () => {
  removeArrayFromStorage();
  navigation.navigate('Coffeelist');
};

const filteredProducts = userpacks ? userpacks.filter(pack => pack.userId === userID) : [];
// console.log("filteredProducts",filteredProducts);
console.log("filteredProductst",filteredProducts);
const firstTwoImages = filteredProducts.slice(0, 2)
// console.log("firstTwoImages",firstTwoImages);

  return (
    <ScrollView>
      <View>
      <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => <PackCard pack={item} />}
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
              Add Pack Photo
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
              value={packName}
              onChangeText={setpackName}
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
              value={packDescription}
              onChangeText={setpackDescription}
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
              value={packSize}
              onChangeText={setpackSize}
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
              value={packPrice}
              onChangeText={setpackPrice}h
            />
          </View>
          <TouchableOpacity onPress={handleremovearray}>
          <Image source={require("../image/coffee-cup.png")} style={styles.optionImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.commandButton} onPress={handleAddpack}>
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
         
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 
  
    productContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
      marginBottom: 10,
    },
    productImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 10,
      marginRight: 10,
    },
    productTextContainer: {
      flex: 1,
      marginLeft: 10,
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
    },
    productDescription: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5,
    },
    productPrice: {
      fontSize: 14,
      color: '#f85c24',
    },
  
  
  
    card: {
      flexDirection: 'row',
      marginBottom: 20,
      borderRadius: 10,
      backgroundColor: '#EFECEC',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    details: {
      padding: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#dba617',
      marginBottom: 5,
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
  backimage:{
    backgroundColor: 'white',
  },
  optionImage: {
    width: 70, // Adjust the width of the image
    height: 50, // Adjust the height of the image
    alignSelf: 'center', // Center the image horizontally
    marginBottom: 10, // Add margin to separate image from text
    resizeMode: 'contain', // Ensure the image fits within its container
    marginTop:20,
    
  },
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
    backgroundColor: 'white', // Example background color
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginTop: 20,
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
    borderRadius: 20,
    backgroundColor: '#dba617',
    alignItems: 'center',
  },
  addButton: {
    // marginTop: 20,
    // padding: 15,
    // borderRadius: 20,
    // backgroundColor: 'white',
    // alignItems: 'center',
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

export default AddPacks;
