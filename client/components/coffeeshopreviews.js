import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import { ipAdress } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewsComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('IdUser');
      if (value !== null) {
        const userId = JSON.parse(value);
        setUserID(userId);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    if (userID !== null) {
      const fetchReviews = async () => {
        try {
          const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/reviewz/reviewee/${userID}`);
          const reviewsData = reviewsResponse.data;
          console.log('Reviews data:', reviewsData);

          const reviewerPromises = reviewsData.map(review =>
            axios.get(`http://${ipAdress}:3000/api/user/${review.reviewerId}`)
          );

          const reviewersResponses = await Promise.all(reviewerPromises);
          const reviewsWithNames = reviewsData.map((review, index) => ({
            ...review,
            reviewerName: reviewersResponses[index].data.name,
          }));

          console.log('Reviews with names:', reviewsWithNames);
          setReviews(reviewsWithNames);

          // Calculate average rating
          const totalRating = reviewsWithNames.reduce((total, review) => total + review.stars, 0);
          const averageRating = totalRating / reviewsWithNames.length;
          setAverageRating(averageRating);

        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  }, [userID]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderReviewCard = (item) => {
    console.log('Rendering review card:', item);

    // Format the date and time
    const formattedDate = new Date(item.createdAt).toLocaleString();

    return (
      <View style={styles.card} key={item.id.toString()}>
        <View style={styles.reviewHeader}>
          <Image source={{ uri: item.Reviewer.imageUrl }} style={styles.image} />
          <View style={styles.nameAndRating}>
            <Text style={styles.title}>{item.Reviewer.firstName + " " + item.Reviewer.lastName}</Text>
            <View style={styles.ratingContainer}>
              <Rating readonly startingValue={item.stars} imageSize={20} />
            </View>
          </View>
        </View>
        {item.comment && <Text style={styles.comment}>{item.comment}</Text>}
        <Text style={styles.dateText}>Reviewed on: {formattedDate}</Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.averageRatingContainer}>
        <Rating style={styles.averageRating} readonly startingValue={averageRating} imageSize={20} />
        <Text style={styles.averageRatingText}>{averageRating.toFixed(1)}</Text>
      </View>
      {reviews.map(review => renderReviewCard(review))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  averageRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: '#dba617',
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "white",
    width: 220,
    alignSelf: 'center', // Center the container itself
  },
  averageRating: {
    marginHorizontal: 5, // Adjust horizontal spacing (reduce or remove this)
  },
  averageRatingText: {
    
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#dba617',
    padding: 6,
    borderRadius: 25,
  backgroundColor:"white"
},
  card: {
    backgroundColor: 'white',
    borderRadius: 35,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameAndRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "black",
    marginLeft: 18,
  },
  ratingContainer: {
    marginLeft: 40,
    borderWidth: 1,
    borderColor: '#dba617',
    padding: 6,
    borderRadius: 25,
  },
  comment: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  dateText: {
    marginTop: 10,
    fontSize: 12,
    color: '#dba617',
    marginLeft:60
  },
  scrollViewContent: {
    paddingBottom: 20, 
  },
});

export default ReviewsComponent;