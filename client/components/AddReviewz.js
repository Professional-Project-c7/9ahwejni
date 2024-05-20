import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import { ipAdress } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';

const AddReviewz = ({ coffeeShopId, userId, onClose }) => {
    const [rating, setRating] = useState(3);

    const submitReview = async () => {
        try {
            await axios.post(`http://${ipAdress}:3000/api/reviewz`, {
                reviewerId: userId,
                revieweeId: coffeeShopId,
                stars: rating,
            });

            Toast.show({
                type: 'success',
                text1: 'Review Submitted',
                text2: 'Your review has been submitted successfully!',
                position: 'bottom',
                visibilityTime: 3000,
                autoHide: true,
                bottomOffset: 30,
                style: { height: 100, justifyContent: 'center', alignItems: 'center', padding: 20 },
                text1Style: { fontSize: 20 },
                text2Style: { fontSize: 16 }
            });
            onClose(); // Close the modal after submitting the review
        } catch (error) {
            console.error('Error submitting review:', error);
            Toast.show({
                type: 'error',
                text1: 'Submission Failed',
                text2: 'Failed to submit your review. Please try again.',
                position: 'bottom',
                visibilityTime: 3000,
                autoHide: true,
                bottomOffset: 30,
                style: { height: 100, justifyContent: 'center', alignItems: 'center', padding: 20 },
                text1Style: { fontSize: 20 },
                text2Style: { fontSize: 16 }
            });
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(219, 166, 23, 1)', 'rgba(219, 166, 23, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
            >
                <Text style={styles.header}>Rate this Shop</Text>
            </LinearGradient>
            <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                showRating
                onFinishRating={setRating}
                startingValue={rating}
                style={styles.rating}
            />
            <Button 
                icon="send" 
                mode="contained" 
                onPress={submitReview} 
                style={styles.button}
                color="#dba617">
                Submit Review
            </Button>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        width: '99%',
        alignSelf: 'center',
    },
    gradientBackground: {
        borderRadius: 10,
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    rating: {
        marginBottom: 30,
        alignSelf: 'center',
    },
    button: {
        marginTop: 20,
    },
});

export default AddReviewz;
