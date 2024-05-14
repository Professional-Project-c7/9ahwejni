import React, { useState } from 'react';
import { View, StyleSheet , Text} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import { ipAdress } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddReview = ({ productId, userId }) => {
    const [rating, setRating] = useState(3); 
    const [comment, setComment] = useState('');

    const submitReview = async () => {
        try {
            const response = await axios.post(`http://${ipAdress}:3000/api/review`, {
                userId: userId,
                prodId: productId,
                stars: rating,
                comment: comment
            });
            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Leave a Review </Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    rating: {
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        color:'red'
    },
});

export default AddReview;