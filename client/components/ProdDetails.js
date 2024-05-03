import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const ProductDetailsPage = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../image/expresso.png')}
                style={styles.productImage}
            />
            <View style={styles.body}>
            <Text style={styles.name}>Expresso</Text>
            <Text style={styles.description}>
                As a beverage, espresso is a concentrated form of coffee brewed with high pressure.
            </Text>
            <View style={styles.bottomContainer}>
                <Text style={styles.sectionTitle}>Customize</Text>
                <View style={styles.optionContainer}>
                    <View style={styles.optionButtonsContainer}>
                        <Text style={styles.optionTitle}>Size</Text>

                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionButtonText}>Smal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionButtonText}>Regulor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionButtonText}>Large</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.optionContainer}>
                    <View style={styles.optionButtonsContainer}>
                        <Text style={styles.optionTitle}>Sugar:</Text>

                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionButtonText}>Normal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionButtonText}>Less</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionButtonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.optionContainer}>
                    <View style={styles.optionButtonsContainer}>
                        <Text style={styles.optionTitle}>Ice:</Text>

                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionButtonText}>Normal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionButtonText}>Less</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionButtonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>$10</Text>
                    <TouchableOpacity >
                        <Text style={styles.add}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 25,
       
    },
    productImage: {
        width: '100%',
        height: 250,
        borderRadius: 25,
      
    },
    body:{ 
        padding:10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom:15,
        marginHorizontal:20,
        paddingTop:10,
        color:'#FFBB70',
    },
    description: {
        marginBottom: 20,
        fontSize: 20,

    },
    bottomContainer: {
        padding:10
    },
    add:{

        fontSize: 26,
        borderRadius: 25,
       
        alignContent:'center',
        textAlign:'center',
marginLeft:90     
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionContainer: {
        marginBottom: 20,
    },
    optionTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left',
        fontSize: 20,
        
    },
    optionButtonsContainer: {
        flexDirection: 'row',
alignItems:'center'

    },
    optionButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 25,
      alignItems:'center' ,
       
    },
    optionButtonText: {
        fontSize: 19,
        borderRadius: 25,
        marginRight:"10%",
        color:'#FFBB70',
        borderColor: '#FFBB70'
    },
    priceContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    productPrice: {
        fontSize: 26,
        fontWeight: 'bold',
        marginRight: 10,
    },
    Button:{
        backgroundColor: '#FFBB70',
        marginBottom: 20,
        borderRadius: 25,
    }
});

export default ProductDetailsPage;
