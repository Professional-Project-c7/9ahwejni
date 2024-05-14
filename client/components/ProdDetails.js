import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { ipAdress } from '../config'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Rating } from 'react-native-ratings';
import AddReview from './AddReview';

const ProductDetailsPage = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedSugar, setSelectedSugar] = useState(null);
    const [selectedIce, setSelectedIce] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    const retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('IdUser');
          if (value !== null) {
            const tokenObject = JSON.parse(value);
            const userId = tokenObject; 
            setSelectedUserId(userId)
           
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };
        useEffect(() => {
        const fetchProductDetails = async (userId) => {
            try {
                const productId = await AsyncStorage.getItem('selectedProductId');
                setSelectedProductId(productId);
                const storedUserId = await AsyncStorage.getItem('userId');  
                setSelectedUserId(userId)

                if (storedUserId) {
                    const userResponse = await axios.get(`http://${ipAdress}:3000/api/user/${userId}`);
                    if (userResponse.data) {
                        setSelectedUserId(userResponse.data); 
                    }
                }
                
                const response = await axios.get(`http://${ipAdress}:3000/api/product/SearchById/${productId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, []);
    useEffect(() =>{
        retrieveData();
    })

    const handleAddToHome = () => {
        navigation.navigate('Tabs');
    };

    const handleSizeSelection = size => setSelectedSize(size);
    const handleSugarSelection = sugar => setSelectedSugar(sugar);
    const handleIceSelection = ice => setSelectedIce(ice);

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
    
    return (
        <ScrollView style={styles.container}>
            <Icon name="arrow-left" size={30} onPress={handleAddToHome} />
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
                            <View style={styles.optionContainer}>
                                <View style={styles.optionButtonsContainer}>
                                    <Text style={styles.optionTitle}>Sugar:</Text>
                                    <TouchableOpacity style={[styles.optionButton, selectedSugar === 'Normal' && styles.selectedOption]} onPress={() => handleSugarSelection('Normal')}>
                                        <Text style={styles.optionButtonText}>Normal</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.optionButton, selectedSugar === 'Less' && styles.selectedOption]} onPress={() => handleSugarSelection('Less')}>
                                        <Text style={styles.optionButtonText}>Less</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.optionButton, selectedSugar === 'No' && styles.selectedOption]} onPress={() => handleSugarSelection('No')}>
                                        <Text style={styles.optionButtonText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionButtonsContainer}>
                                    <Text style={styles.optionTitle}>Ice:</Text>
                                    <TouchableOpacity style={[styles.optionButton, selectedIce === 'Normal' && styles.selectedOption]} onPress={() => handleIceSelection('Normal')}>
                                        <Text style={styles.optionButtonText}>Normal</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.optionButton, selectedIce === 'Less' && styles.selectedOption]} onPress={() => handleIceSelection('Less')}>
                                        <Text style={styles.optionButtonText}>Less</Text>
                                                                       </TouchableOpacity>
                                    <TouchableOpacity style={[styles.optionButton, selectedIce === 'No' && styles.selectedOption]} onPress={() => handleIceSelection('No')}>
                                        <Text style={styles.optionButtonText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.productPrice}>${product.price}</Text>
                                <TouchableOpacity onPress={handleAddToCart}>
                                    <Text style={styles.add}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
    <AddReview productId={selectedProductId} userId={selectedUserId} />
    

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', 
        padding: 10
    },
    productContainer: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden' 
    },
    productImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover'
    },
    body: {
        padding: 20
    },
    name: {
        fontSize:27,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#dba617' 
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black' 
    },
    bottomContainer: {
        marginTop: 10
    },
    add: {
        backgroundColor: '#FFBB70', 
        color: 'white', 
        padding: 10,
        textAlign: 'center',
        borderRadius: 25,
        fontSize: 18,
        fontWeight: 'bold',
        overflow: 'hidden'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    productPrice: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#FFBB70',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        overflow: 'hidden' 
    },
    optionContainer: {
        marginBottom: 10,
        backgroundColor: '#FFFFFF', 
        borderRadius: 15,
        paddingVertical: 10,
        borderColor: '#000000',
    },
    optionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    optionTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    optionButton: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#FFBB70',
        overflow: 'hidden' 
    },
    optionButtonText: {
        fontSize: 17,
        color: '#666' 
    },
    selectedOption: {
        backgroundColor: '#FFBB70', 
        color : '#FFFF'
    },
    selectedOptionText: {
        color: 'white', 
    },
    reviewButton: {
        marginTop: 10,
        backgroundColor: '#FFBB70',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 20,
    },
    
});

export default ProductDetailsPage;
