import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import { ipAdress } from '../config';
import Toast from 'react-native-toast-message';

const AddReview = ({ productId, userId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(3); 
    const [comment, setComment] = useState('');

    const submitReview = async () => {
        try {
            await axios.post(`http://${ipAdress}:3000/api/review`, {
                userId: userId,
                prodId: productId,
                stars: rating,
                comment: comment
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

            if (onReviewSubmitted) {
                onReviewSubmitted();
            }
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
            <Text style={styles.header}>Leave a Review</Text>
            <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                showRating
                onFinishRating={setRating}
                startingValue={rating}
                style={styles.rating}
            />
            <TextInput
                label="Add a comment (optional)"
                value={comment}
                onChangeText={setComment}
                mode="outlined"
                style={styles.input}
                right={<TextInput.Icon name="pencil" />}
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
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        width: '90%',
        alignSelf: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    rating: {
        marginBottom: 30,
        alignSelf: 'center',
    },
    input: {
        marginBottom: 30,
    },
    button: {
        marginTop: 20,
        color:'pink'
    },
});

export default AddReview;
