import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const SellerPage = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Product Cards</Text>
                {/* Product Cards Section */}
                <View style={styles.cardContainer}>
                    {/* Sample Product Card */}
                    <TouchableOpacity style={styles.productCard}>
                        <Text style={styles.productName}>Product 1</Text>
                        <Text style={styles.productPrice}>$10</Text>
                    </TouchableOpacity>
                    {/* Add more product cards as needed */}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Invoice Details</Text>
                {/* Invoice Details Section */}
                <View style={styles.invoiceContainer}>
                    {/* Sample Invoice Item */}
                    <View style={styles.invoiceItem}>
                        <Text>Product Name: Product 1</Text>
                        <Text>Quantity: 1</Text>
                        <Text>Price: $10</Text>
                    </View>
                    {/* Add more invoice items as needed */}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    productCard: {
        width: '45%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginRight: '5%',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        color: 'green',
    },
    invoiceContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
    },
    invoiceItem: {
        marginBottom: 10,
    },
});

export default SellerPage;
