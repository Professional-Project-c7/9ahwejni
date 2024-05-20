import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import axios from 'axios';
import { ipAdress } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import AddReview from './AddReview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import user from '../image/user.png';
import moment from 'moment';

const ProductDetailsPage = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedSugar, setSelectedSugar] = useState(null);
    const [selectedIce, setSelectedIce] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reviews, setReviews] = useState([]);

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
                fetchReviews(productId);  // Fetch reviews for the current product
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

    const goToHomePage = () => {
        AsyncStorage.removeItem('selectedProductId');
        navigation.navigate('homePage'); // Assuming 'Home' is the name of your home page screen
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

    const toggleModalVisibility = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleReviewSubmitted = () => {
        fetchReviews(selectedProductId);
        toggleModalVisibility();
    };

    return (
        <ScrollView style={styles.container}>
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
                            <Text style={styles.productPrice}>{product.price} TND</Text>

                            <View style={styles.priceContainer}>
                                <TouchableOpacity onPress={handleAddToCart}>
                                    <Text style={styles.addReviewButton}>Add to cart</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleModalVisibility}>
                                    <Text style={styles.addReviewButton}>Add Review</Text>
                                </TouchableOpacity>
                            </View>
                            <Button
                                title="Go to Home"
                                onPress={() => navigation.navigate('homePage')}
                                color="#FFBB70"
                                style={styles.adad}
                            />
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
        padding: 10
    },
    adad: {
        marginTop: 50,
    },
    productContainer: {
        marginBottom: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden'
    },
    productImage: {
        width: '100%',
        height: 250,
    },
    body: {
        padding: 20
    },
    name: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFBB70',
        marginBottom: 15
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black'
    },
    bottomContainer: {
        marginTop: 60
    },
    add: {
        color: '#FFBB70',
        textAlign: 'center',
        marginTop: 30,
        fontSize: 35,
    },
    addReviewButton: {
        backgroundColor: '#FFBB70',
        color: 'white',
        padding: 10,
        textAlign: 'center',
        borderRadius: 25,
        fontSize: 22,
        fontWeight: 'bold',
        overflow: 'hidden'
    },
    sectionTitle: {
        fontSize: 18,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    productPrice: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#FFBB70',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 30,
        marginLeft: 115,
        width: 120
    },
    optionContainer: {
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
        color: '#FFFF'
    },
    selectedOptionText: {
        color: 'white',
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
        marginTop: 50
    },
    reviewCard: {
        flexDirection: 'row',
        marginBottom: 10,
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
        overflow: 'hidden'
    },
    reviewContent: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#481E14',
    },
    rating: {
        marginVertical: 5,
        right: 90
    },
    comment: {
        fontSize: 16,
        color: '#200E3A',
    },
});

export default ProductDetailsPage;
