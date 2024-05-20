import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Marketplace() {
  const [reviewData, setReviewData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/review");
        setReviewData(response.data);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://192.168.11.244:3000/api/user");
        const filteredData = response.data.filter(e => e.UserType === "client");
        setUserData(filteredData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/review/${reviewId}`);
      setReviewData(prevData => prevData.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review: ", error);
      alert('Failed to delete review');
    }
  };

  const getUserNameById = (userId) => {
    const user = userData.find(user => user.id === userId);
    return user ? user.FirstName : "Unknown";
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="center" mb="20px">
        <Text fontSize="2xl" fontWeight="bold">User Reviews</Text>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px">
        {reviewData.map((review, index) => (
          <Box key={index} bg="white" boxShadow="lg" borderRadius="xl" p="4">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="2"> {getUserNameById(review.userId)}</Text>
            <Text color={textColor} fontSize="md" mb="4">{review.comment}</Text>
            <Flex justifyContent="flex-end">
              <Button onClick={() => deleteReview(review.id)} colorScheme="red" leftIcon={<DeleteIcon />} variant="outline">
                Delete Review
              </Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
