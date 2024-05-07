import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity ,Image} from 'react-native';

const SellerPage = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>




<ImagedCardView
  stars={5}
  reviews={456}
  ratings={4.5}
  title="Yosemite"
  rightSideValue="$990"
  subtitle="California"
  leftSideValue="3 Days"
  backgroundColor="#ff6460"
  source={{
    uri: yosemite
  }}
/>




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
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    productCard: {
        width: '45%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        height: 200,
    },
    productImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    productDetails: {
        padding: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: 'green',
    },
});


export default SellerPage;
