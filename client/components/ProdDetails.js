import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { ipAdress } from '../config'; 

const ProductDetailsPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedSugar, setSelectedSugar] = useState(null);
    const [selectedIce, setSelectedIce] = useState(null);

console.log(products);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${ipAdress}:3000/api/product/SearchById/47`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    const handleSugarSelection = (sugar) => {
        setSelectedSugar(sugar);
    };

    const handleIceSelection = (ice) => {
        setSelectedIce(ice);
    };
    const handleAddToCart = () => {
        // Navigate to cart page and pass product ID as parameter
        navigation.navigate('Cart', { productId: products[0].id });
    };

    return (
        <View style={styles.container}>
            {products.map((product, index) => (
                <View key={index} style={styles.productContainer}>
                    <Image
                        source={{ uri: product.imgUrl }}
                        style={styles.productImage}
                    />
                    <View style={styles.body}>
                        <Text style={styles.name}>{product.name}</Text>
                        <Text style={styles.description}>{product.description}</Text>
                        <View style={styles.bottomContainer}>
                            <Text style={styles.sectionTitle}>Customize</Text>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionButtonsContainer}>
                                    <Text style={styles.optionTitle}>Size</Text>

                                    <TouchableOpacity
                                        style={[styles.optionButton, selectedSize === 'Small' && styles.selectedOption]}
                                        onPress={() => handleSizeSelection('Small')}
                                    >
                                        <Text style={styles.optionButtonText}>Small</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.optionButton, selectedSize === 'Regular' && styles.selectedOption]}
                                        onPress={() => handleSizeSelection('Regular')}
                                    >
                                        <Text style={styles.optionButtonText}>Regular</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.optionButton, selectedSize === 'Large' && styles.selectedOption]}
                                        onPress={() => handleSizeSelection('Large')}
                                    >
                                        <Text style={styles.optionButtonText}>Large</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.optionContainer}>
                            <View style={styles.optionButtonsContainer}>
    <Text style={styles.optionTitle}>Sugar:</Text>

    <TouchableOpacity
        style={[
            styles.optionButton,
            selectedSugar === 'Normal' && styles.selectedOption
        ]}
        onPress={() => handleSugarSelection('Normal')}
    >
        <Text style={styles.optionButtonText}>Normal</Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={[
            styles.optionButton,
            selectedSugar === 'Less' && styles.selectedOption
        ]}
        onPress={() => handleSugarSelection('Less')}
    >
        <Text style={styles.optionButtonText}>Less</Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={[
            styles.optionButton,
            selectedSugar === 'No' && styles.selectedOption
        ]}
        onPress={() => handleSugarSelection('No')}
    >
        <Text style={styles.optionButtonText}>No</Text>
    </TouchableOpacity>
                            </View>
                            </View>
                            <View style={styles.optionContainer}>
                            <View style={styles.optionButtonsContainer}>
                                <Text style={styles.optionTitle}>Ice:</Text>
                                <TouchableOpacity
                                    style={[
                                        styles.optionButton,
                                        selectedIce === 'Normal' && styles.selectedOption
                                    ]}
                                    onPress={() => handleIceSelection('Normal')}
                                >
                                    <Text style={styles.optionButtonText}>Normal</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.optionButton,
                                        selectedIce === 'Less' && styles.selectedOption
                                    ]}
                                    onPress={() => handleIceSelection('Less')}
                                >
                                    <Text style={styles.optionButtonText}>Less</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.optionButton,
                                        selectedIce === 'No' && styles.selectedOption
                                    ]}
                                    onPress={() => handleIceSelection('No')}
                                >
                                    <Text style={styles.optionButtonText}>No</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.productPrice}>${product.price}</Text>
                                <TouchableOpacity>
                                    <Text style={styles.add} onPress={handleAddToCart }   >Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
       
    },
    productContainer: {
        marginBottom: 20,
    },
    productImage: {
        width: '100%',
        height: 250,
        borderRadius: 25,
    },
    body: {
        padding: 10,
        backgroundColor: '#F7F7F7',
        borderRadius: 25,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        color: '#FFBB70',
    },
    description: {
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    bottomContainer: {
        padding: 10,
    },
    add: {
        borderWidth: 1,
        borderColor: '#FFBB70',
        width: '100%',
        fontSize: 22,
        borderRadius: 25,
        color: '#FFBB70',
        textAlign: 'center',
        marginTop: 10,
        marginRight:140,
        
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 11,
        marginLeft:40
    },
    productPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333333',

    },
    optionContainer: {
        marginBottom: 10,
    },
    optionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#FFBB70',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    optionButtonText: {
        fontSize: 16,
        color: '#FFBB70',
    },
    selectedOption: {
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black', // Change text color to black
    },
    
});

export default ProductDetailsPage;