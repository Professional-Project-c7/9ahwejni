import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,TextInput, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import { ipAdress } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import AddReview from './AddReview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import user from '../image/user.png';
import moment from 'moment';
import basket from '../image/addtobasket.png';
// import Rapport from './Rapport'

const ProductDetailsPage = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedSugar, setSelectedSugar] = useState(null);
    const [selectedIce, setSelectedIce] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisiblee, setIsModalVisiblee] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [Rapport , setRapport] = useState([]);
    const [description, setDescription] = useState('');

    

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('IdUser');
            if (value !== null) {
                const tokenObject = JSON.parse(value);
                const userId = tokenObject;
                setSelectedUserId(userId);
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    const fetchReviews = async (productId) => {
        try {
            const response = await axios.get(`http://${ipAdress}:3000/api/review/product/${productId}`);
            setReviews(response.data.reverse());
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const Rapports = async ()=>{
        try {
            const response = await axios.get(`http://${ipAdress}:3000/api/Rapport`)
            setRapport(response.data.reverse());
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }
    const PostRapports = async () => {
        try {
            const rapportData = {
                Description: description,};
            const response = await axios.post(`http://${ipAdress}:3000/api/Rapport`, rapportData);
            const newReport = response.data;
            if (Array.isArray(newReport)) {
                setRapport(newReport.reverse());
            } else {
               
                Rapports();
            }
           toggleModal1();
        } catch (error) {
            console.error('Error posting report:', error);
        }
    };
    
    


    useEffect(()=>{
        Rapports();
    },[])
    console.log('touuuuuuuuuuuuuuuuuu',Rapport)

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productId = await AsyncStorage.getItem('selectedProductId');
                setSelectedProductId(productId);
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    const userResponse = await axios.get(`http://${ipAdress}:3000/api/user/${storedUserId}`);
                    if (userResponse.data) {
                        setSelectedUserId(userResponse.data.id);
                    }
                }

                const response = await axios.get(`http://${ipAdress}:3000/api/product/SearchById/${productId}`);
                setProducts(response.data);
                fetchReviews(productId);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, []);

    useEffect(() => {
        retrieveData();
    }, []);

    const handleAddToHome = () => {
        navigation.navigate('Tabs');
        AsyncStorage.removeItem('selectedProductId');
    };
    // const handleRapport = () => {
    //     navigation.navigate('Rapport');
    //     // AsyncStorage.removeItem('selectedProductId');
    // };
    

    const goToHomePage = () => {
        AsyncStorage.removeItem('selectedProductId');
        navigation.navigate('homePage');
    };
    
    const gotoRapport = () => {
        AsyncStorage.removeItem('selectedProductId');
        navigation.navigate('Rapport');
    };

    const handleSizeSelection = size => setSelectedSize(size);


    const handleAddToCart = async () => {
        try {
            const existingCartItems = await AsyncStorage.getItem('favorites');
            const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
            cartItems.push(products[0]);
            await AsyncStorage.setItem('favorites', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const toggleModalVisibility = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleReviewSubmitted = () => {
        fetchReviews(selectedProductId);
        toggleModalVisibility();
    };
    const toggleModal1 = () => {
        setIsModalVisiblee(!isModalVisiblee);
      };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={goToHomePage} style={styles.backButton}>
                <Icon name="arrow-left" size={30} color="#dba617" />
            </TouchableOpacity>
            {products.map((product, index) => (
                <View key={index} style={styles.productContainer}>
                    <Image source={{ uri: product.imgUrl }} style={styles.productImage} />
                    <View style={styles.body}>
                        <Text style={styles.name}>{product.name}</Text>
                        <Text style={styles.description}>{product.description}</Text>
                        <View style={styles.bottomContainer}>
                            <Text style={styles.sectionTitle}>Customize</Text>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionButtonsContainer}>
                                    <Text style={styles.optionTitle}>Size</Text>
                                    <TouchableOpacity style={[styles.optionButton, selectedSize === 'Small' && styles.selectedOption]} onPress={() => handleSizeSelection('Small')}>
                                        <Text style={styles.optionButtonText}>Small</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.optionButton, selectedSize === 'Regular' && styles.selectedOption]} onPress={() => handleSizeSelection('Regular')}>
                                        <Text style={styles.optionButtonText}>Regular</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.optionButton, selectedSize === 'Large' && styles.selectedOption]} onPress={() => handleSizeSelection('Large')}>
                                        <Text style={styles.optionButtonText}>Large</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                           
                            <Text style={styles.productPrice}>{product.price} TND</Text>
                            <View style={styles.priceContainer}>
                                <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
                                    <Image source={basket} style={styles.basketIcon} />
                                    <Text style={styles.addToCartButtonText}>Add to cart</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleModalVisibility} style={styles.addReviewButton}>
                                    <Text style={styles.addReviewButtonText}>⭐ Add Review</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModalVisibility}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <AddReview productId={selectedProductId} userId={selectedUserId} onReviewSubmitted={handleReviewSubmitted} />
                        <TouchableOpacity onPress={toggleModalVisibility} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.reviewsContainer}>
                
                {reviews.map((review, index) => (
                    <View key={index} style={styles.reviewCard}>
                        <Image source={{ uri: review.user ? review.user.ImageUrl : user }} style={styles.userImage} />
                        <View style={styles.reviewContent}>
                            <Text style={styles.userName}>
                                
                                {review.user ? `${review.user.FirstName} ${review.user.LastName}` : 'Anonymous'}
                            </Text>
                            <Text>{moment(review.createdAt).fromNow()}</Text>
                           
                            <Rating
                                type="star"
                                ratingCount={5}
                                imageSize={20}
                                startingValue={review.stars}
                                readonly
                                style={styles.rating}
                            />
                            <Text style={styles.comment}>{review.comment}</Text>
                        </View>
                        <TouchableOpacity style={styles.optionOne} onPress={toggleModal1}>
                       <View >
                  <Icon name="flag" style={{marginLeft:100}} size={30} color="#dba617"   />
               </View>
               </TouchableOpacity>
                      
                         
         <Modal animationType="slide" transparent={true} visible={isModalVisiblee} onRequestClose={toggleModal1}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
        
          <TextInput
          style={styles.textInput}
          placeholder='add rapport'
          value={description}
          onChangeText={setDescription}
        //   placeholderTextColor="transparent"
       
        />
                    <TouchableOpacity style={styles.closeButton} onPress={PostRapports}>
              <Text style={styles.closeButtonText}>  send  </Text>
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal1}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'row',
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
      },
      placeholder: {
        position: 'absolute',
        left: 10,
        top: 10,
        color: '#aaa',
        fontSize: 16, // Adjust this value to change the placeholder text size
      },
   
      textInput: {
      
        height: 100,
        width:320,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        // fontSize: 16,
    
      },
    backButton: {
        marginTop: 1,
        marginLeft: 1,
    },
    productContainer: {
        marginBottom: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 250,
    },
    body: {
        padding: 20,
    },
    name: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#dba617',
        marginBottom: 15,
        fontStyle: 'italic'

    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
        marginBottom: 13,
        fontStyle: 'italic'
    },
    bottomContainer: {
        marginTop: 14,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        fontStyle: 'italic'

    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#dba617',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontStyle: 'italic'

    },
    optionContainer: {
        marginBottom: 15,
    },
    optionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
        fontStyle: 'italic'

    },
    optionButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#dba617',
        overflow: 'hidden',
    },
    optionButtonText: {
        fontSize: 16,
        color: '#111',
        fontStyle: 'italic'

    },
    selectedOption: {
        backgroundColor: '#dba617',
    },
    selectedOptionText: {
        color: 'white',
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dba617',
        padding: 10,
        borderRadius: 10,
    },
    basketIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    addToCartButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'

    },
    addReviewButton: {
        backgroundColor: '#dba617',
        padding: 10,
        borderRadius: 10,
    },
    addReviewButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'

    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#dba617',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    reviewsContainer: {
        padding: 10,
        marginTop: 20,
    },
    reviewCard: {
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    userImage: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 25,
        overflow: 'hidden',
    },
    reviewContent: {
        flex: 1,
    },
    reviewContent1: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
        fontStyle: 'italic'

    },
    rating: {
        marginVertical: 5,
        alignSelf: 'flex-start',
    },
    comment: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic'

    },
});

export default ProductDetailsPage;
