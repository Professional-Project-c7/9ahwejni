import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList,Button, TextInput, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView,Modal } from 'react-native';
import { useTheme,IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import imagee from "../image/expresso.png"
import { imageHandler } from '../components/imagehandlercloud';
import { launchImageLibrary } from 'react-native-image-picker';

const PackCard = ({ pack, onPressProducts }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressProducts}>
      <Image source={{ uri: pack.imgUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{pack.name}</Text>
        <Text style={styles.description}>{pack.description}</Text>
        <Text style={styles.price}>{pack.price} $</Text>
        <TouchableOpacity onPress={onPressProducts}>
          <Text style={styles.showProductsButton}>Show Products</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const ProductModal = ({ isVisible, onHide, products }) => {
  return (
    <Modal
      visible={isVisible}
      onRequestClose={onHide}
      animationType="slide"
    >
      <ScrollView style={styles.modalContent}>
        <Text style={styles.modalTitle}>Products</Text>
        <View style={styles.productContainer}>
          {products.map((product, index) => (
            <View key={product.id} style={styles.productItem}>
              <Image source={{ uri: product.imgUrl }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <Text style={styles.productPrice}>{product.price} $</Text>
              </View>
            </View>
          ))}
        </View>
        
      </ScrollView>
      <TouchableOpacity onPress={onHide} style={styles.closeButton}>
      <Image source={require("../image/logout.png")} style={styles.optionImageE} />

        </TouchableOpacity>
    </Modal>
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
  const [selectedPack, setSelectedPack] = useState(null);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [imgUrl, setimgUrl] = useState('');

  const handleShowProducts = (pack) => {
    setSelectedPack(pack);
    setIsProductModalVisible(true);
  };

  const imageHandler = async (image) => {
    try {
      const data = new FormData();
      data.append('file', {
        uri: image.assets[0].uri,
        type: image.assets[0].type,
        name: 'photo.jpg'
      });
      data.append('upload_preset', 'i38oelnt'); // Replace 'your_upload_preset' with your Cloudinary upload preset
      data.append('cloud_name', 'dqyx6lht5'); // Replace 'your_cloud_name' with your Cloudinary cloud name
  
      const response = await fetch('https://api.cloudinary.com/v1_1/dqyx6lht5/image/upload', {
        method: 'POST',
        body: data
      });
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  const pickImage = () => {
    launchImageLibrary({}, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        try {
          const imageUri = await imageHandler(response);
          console.log('Image URI:', imageUri);
          setimgUrl(imageUri);
        } catch (error) {
          console.error('Error uploading image:', error);
          Alert.alert('Upload Failed', 'Failed to upload image. Please try again.');
        }
      }
    });
  };

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
      imgUrl:imgUrl,
      checkedProductIDs:array
    };

    const response = await axios.post(`http://${ipAdress}:3000/api/packs`, newpack);
    console.log('pack added successfully:', response.data);

    
    setpackName('');
    setpackDescription('');
    setpackSize('');
    setpackPrice('');
    setimgUrl('')
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
      <ScrollView>
      <View style={styles.top}>
          <Text style={styles.Texttitlepacks} >Packs's List</Text>
          <Text style={styles.seeAllpacks} onPress={() => navigation.navigate('SeeAllPacksCoffee')}>See All</Text>
        </View>
      <View>
        <SafeAreaView style={{ flex: 1 }}>
        <FlatList
  data={filteredProducts}
  renderItem={({ item }) => <PackCard pack={item} onPressProducts={() => handleShowProducts(item)} />}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={styles.container}
  numColumns={2} // Display two columns
/>

        </SafeAreaView>
        <ProductModal
          isVisible={isProductModalVisible}
          onHide={() => setIsProductModalVisible(false)}
          products={selectedPack ? selectedPack.prods : []}
        />
      </View>
    </ScrollView>

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
                <ImageBackground>
                 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  {imgUrl && (
                    <Image source={{ uri: imgUrl }} style={{ width: 125, height: 120 }} />
                  )}
                   </View>
                  {/* style={{ height: 120, width: 125 }}
                  imageStyle={{ borderRadius: 15 }}> */}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                    onPress={pickImage}
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
          {/* <View style={styles.action}>
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
          </View> */}
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
          {/* <TouchableOpacity style={styles.commandButton}  onPress={() => navigation.navigate('TestCloud')}>
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity> */}
         
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // closeButton: {
  //   marginTop: 340,
  //   marginRight: 70,
  //   backgroundColor: '#dba617',
  //   padding: 10,
  //   borderRadius: 30,
  //   // flex: 1,
  //   alignItems: 'center',
  //   alignSelf: 'flex-end',
  //   width:120,
  //   height:50,
  //   fontSize: 20,
  
  // },
  // closeButtonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },

  optionImageE: {
    width: 53, // Adjust the width of the image
    height: 20, // Adjust the height of the image
    alignSelf: 'center', // Center the image horizontally
    marginBottom: 10, // Add margin to separate image from text
    resizeMode: 'contain', // Ensure the image fits within its container
    marginTop:10,
    
  },
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

  showProductsButton: {
    color: 'black', // or any color you prefer
    fontSize: 16,
    // textDecorationLine: 'underline',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%', // Adjust the width to fit two items per line with a small gap
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#EFECEC',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productDetails: {
    padding: 10,
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
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor:" rgba(0, 0, 0, 0.5)",
    // padding: 10,
    borderRadius: 10,
    marginLeft:22
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#EFECEC',
    overflow: 'hidden',
    elevation: 4, // Add shadow
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 10, // Add border radius to top-left and top-right corners
    borderTopRightRadius: 10,
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
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
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
