import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.imgUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.description}>{product.category}</Text>

        <View style={styles.optionContainer}>
          {(product.options || []).map((option, index) => (
            <View key={index}>
              <View style={styles.optionWrapper}>
                <Text style={styles.option}>{option.option}</Text>
                <Text style={styles.price}>{option.price} $</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const ProductList = ({ navigation }) => {
  const { colors } = useTheme();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState(0);
  const [smallSelected, setSmallSelected] = useState(false);
  const [mediumSelected, setMediumSelected] = useState(false);
  const [largeSelected, setLargeSelected] = useState(false);
  const [smallSizePrice, setsmallSizePrice] = useState('');
  const [mediumSizePrice, setmediumSizePrice] = useState('');
  const [largeSizePrice, setlargeSizePrice] = useState('');
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [isloading,setisloading]=useState(false)
  const [updater, setupdater] = useState(false);

  const handleSizeSelection = (size, price, setSelected) => {
    setSelected(prevSelected => {
      const isSelected = !prevSelected;
      let updatedOptions;

      if (isSelected) {
        if (price) {
          updatedOptions = [...options, { option: size, price }];
        } else {
          updatedOptions = options;
        }
      } else {
        updatedOptions = options.filter(option => option.option !== size);
      }

      setOptions(updatedOptions);
      return isSelected;
    });
  };

  const imageHandler = async image => {
    try {
      const data = new FormData();
      data.append('file', {
        uri: image.assets[0].uri,
        type: image.assets[0].type,
        name: 'photo.jpg',
      });
      data.append('upload_preset', 'i38oelnt'); // Replace 'your_upload_preset' with your Cloudinary upload preset
      data.append('cloud_name', 'dqyx6lht5'); // Replace 'your_cloud_name' with your Cloudinary cloud name

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dqyx6lht5/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );
      const result =await response.json();
      console.log('Cloudinary response:', result);
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const pickImage = () => {
    setisloading(true)
    launchImageLibrary({}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        try {
          const imageUri = await imageHandler(response);
          console.log('Image URI:', imageUri);
          setisloading(false)
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
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('IdUser');
      if (value!== null) {
        const tokenObject = JSON.parse(value);
        const userId = tokenObject;
        setUserID(userId);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    const getUserData = async userId => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/product`);
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    if (userID) {
      getUserData(userID);

    }
  }, [userID,updater]);

  const handleAddProduct = async () => {
    try {
      if (!userID) {
        console.error('User ID not found.');
        return;
      }

      const newProduct = {
        name: productName,
        price: mediumSizePrice,
        description: productDescription,
        userId: userID,
        imgUrl: imgUrl,
        options: options,
        category: category,
      };

      const response = await axios.post(`http://${ipAdress}:3000/api/product`, newProduct);
      console.log('Product added successfully:', response.data);

      setIsModalVisible(false);

      setProductName('');
      setProductDescription('');
      setProductSize('');
      setProductPrice('');
      setOptions([]);
      setsmallSizePrice('');
      setmediumSizePrice('');
      setlargeSizePrice('');
      setSmallSelected(false);
      setMediumSelected(false);
      setLargeSelected(false);
      setCategory('');
      setimgUrl('')
      setupdater(!updater)

    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const filteredProducts = userData? userData.filter(product => product.userId === userID) : [];
  const firstTwoImages = filteredProducts.slice(0, 4);

  return (
    <ScrollView>
      <View>
        <View style={styles.top}>
          <Text style={styles.Texttitlepacks}>Products' List</Text>
          <Text style={styles.seeAllpacks} onPress={() => navigation.navigate('SeeAllProdsCoffee')}>
            See All
          </Text>
        </View>
        <SafeAreaView style={{ flex:1 }}>
          <FlatList
            data={firstTwoImages}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
            numColumns={2}
          />
        </SafeAreaView>
        <View style={styles.container}>
          <View style={styles.addProductButton}>
            <TouchableOpacity onPress={toggleModal}>
            <Image source={require("../image/cross-selling.png")} style={styles.optionImageE} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <ScrollView>
          
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <TouchableOpacity style={styles.cameraIconContainer} onPress={pickImage}>
<FontAwesome name="camera" color={'#dba617'} size={30} />
</TouchableOpacity>
            <View style={styles.modalHeader}>
              {/* <Text style={styles.modalTitle}>Add Product</Text> */}
              <Pressable onPress={toggleModal}>
                <Icon name="close" size={24} color="#dba617" />
              </Pressable>
            </View>
            <View style={styles.modalContent}>
  {       !isloading ?    (<View style={styles.imageContainer}>
    <Image  source={{ uri: imgUrl }} style={styles.image} />
  </View>):
(  <View>
<ActivityIndicator animating={true} color={MD2Colors.red800} />

  </View>)
  }
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
                <Text style={styles.optionTitle}>Size</Text>
                <View style={styles.optionButtonsContainer}>
                  <View style={styles.sizePriceContainer}>
                    <View style={styles.sizeInputContainer}>
                      <TouchableOpacity
                        style={[styles.optionButton, smallSelected && styles.selectedOption]}
                        onPress={() => handleSizeSelection('Small', smallSizePrice, setSmallSelected)}>
                        <Text style={styles.optionButtonText}>Small</Text>
                      </TouchableOpacity>
                      <TextInput
                        placeholder="Price"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        style={[
                          styles.sizePriceInput2,
                          {
                            color: colors.text,
                          },
                        ]}
                        value={smallSizePrice}
                        onChangeText={setsmallSizePrice}
                        onFocus={() => setSmallSelected(true)} // Maintain selection state when input is focused
                        onBlur={() => handleSizeSelection('Small', smallSizePrice, setSmallSelected)}
                      />
                    </View>
                    <View style={styles.sizeInputContainer}>
                      <TouchableOpacity
                        style={[styles.optionButton, mediumSelected && styles.selectedOption]}
                        onPress={() => handleSizeSelection('Medium', mediumSizePrice, setMediumSelected)}>
                        <Text style={styles.optionButtonText}>Medium</Text>
                      </TouchableOpacity>
                      <TextInput
                        placeholder="Price"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        style={[
                          styles.sizePriceInput,
                {
                            color: colors.text,
                          },
                        ]}
                        value={mediumSizePrice}
                        onChangeText={setmediumSizePrice}
                        onFocus={() => setMediumSelected(true)} // Maintain selection state when input is focused
                        onBlur={() => handleSizeSelection('Medium', mediumSizePrice, setMediumSelected)}
                      />
                    </View>
                    <View style={styles.sizeInputContainer}>
                      <TouchableOpacity
                        style={[styles.optionButton, largeSelected && styles.selectedOption]}
                        onPress={() => handleSizeSelection('Large', largeSizePrice, setLargeSelected)}>
                        <Text style={styles.optionButtonText}>Large</Text>
                      </TouchableOpacity>
                      <TextInput
                        placeholder="Price"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        style={[
                          styles.sizePriceInput,
                          {
                            color: colors.text,
                          },
                        ]}
                        value={largeSizePrice}
                        onChangeText={setlargeSizePrice}
                        onFocus={() => setLargeSelected(true)} // Maintain selection state when input is focused
                        onBlur={() => handleSizeSelection('Large', largeSizePrice, setLargeSelected)}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.action2}>
                <Text style={styles.optionTitle}>Category</Text>
                <View style={styles.optionButtonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      category === 'coffee' && styles.selectedOption,
                    ]}
                    onPress={() => setCategory('coffee')}>
                    <Text style={styles.optionButtonText}>Coffee</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      category === 'cake' && styles.selectedOption,
                    ]}
                    onPress={() => setCategory('cake')}>
                    <Text style={styles.optionButtonText}>Cake</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      category ==='drink' && styles.selectedOption,
                    ]}
                    onPress={() => setCategory('drink')}>
                    <Text style={styles.optionButtonText}>Drink</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.action2}>
           
                <TouchableOpacity onPress={pickImage}>
                  {/* <TextInput
                    // placeholder="Image URL"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    value={imgUrl}
                    onChangeText={setimgUrl}
                    editable={false}
                  /> */}
                   
                </TouchableOpacity>
                
              </View>
              <TouchableOpacity style={styles.commandButton} onPress={handleAddProduct}>
                <Text style={styles.panelButtonTitle}>Add Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </ScrollView>

      </Modal>
    </ScrollView>
  
  );
};

const styles = StyleSheet.create({
  addProductButton: {
    // backgroundColor: '#dba617',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  addProductText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0, // remove the marginTop property
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%', // set the width to 90%
    height: '80%', // set the height to 80%
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContent: {
    width: '100%',
    margin: 10,
    alignItems: 'center',
    maxHeight: '70%', // Limit the height of the modal content to 70% of the screen height
  },
  imageContainer: {
    width: 80,
    height: 80,
    // borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sizePriceContainer: {
    flexDirection: 'column',
  },
  sizeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 58,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sizePriceInput: {
    // flex: 1,
    paddingLeft: 14,
    padding: 7,
    color: '#05375a',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginLeft: 35,
    width: 60,
  },

  sizePriceInput2: {
    // flex: 1,
    paddingLeft: 14,
    padding: 7,
    color: '#05375a',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginLeft: 35,
    width: 60,
  },
  cameraIconContainer: {
    position: 'absolute',
    top: '30%',
    left: '100%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    // backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
   
    borderWidth: 0, // remove the line under the camera icon by setting borderWidth to 0
  },
  optionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginHorizontal: 6, 
    borderWidth: 1,
    borderColor: '#FFBB70',
    overflow: 'hidden',
    width:68
  },
  optionButtonText: {
    fontSize: 15,
    color: '#666',
  },
  selectedOption: {
    backgroundColor: '#dba617',
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
    marginLeft: 20,
  },
  seeAllpacks: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dba617',
    marginTop: 40,
    marginRight: 30,
  },
  optionWrapper: {
    backgroundColor: '#dba617',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    marginBottom: 5,
    overflow: 'hidden',
    elevation: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 30,
    backgroundColor: '#EFECEC',
    overflow: 'hidden',
    elevation: 15,
  },
  price: {
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
    backgroundColor: 'white',
    padding: 4,
borderRadius: 20,
    marginTop: 5,
    marginRight: 5,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  details: {
    padding: 10,
  },
  name: {
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dba617',
    marginBottom: 5,
    textAlign: 'center',  // Center the text
  },
  description: {
    borderRadius: 15,

    fontStyle: 'italic',
    fontSize: 18,
    color: '#888',
    marginBottom: 5,
    textAlign: 'center',  // Center the text
    
  },


  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  // optionContainer: {
  //   flexDirection: 'flex',
  //   alignItems: 'center',
  //   marginTop: 5,
  // },
  option: {
    fontStyle: 'italic',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    borderRadius: 5,
    color: 'white',
    fontSize: 18,
  },
  optionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
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
    backgroundColor: '#f0f0f0',
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
  selectedOption: {
    backgroundColor: '#dba617',
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
  action2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    // borderBottomWidth: 1,
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