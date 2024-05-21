import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Button,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Marketplace() {
  const [reviewData, setReviewData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get("http://localhost:3000/api/review");
        setReviewData(response.data);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/api/user");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/api/product/myProducts");
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    }
    fetchProducts();
  }, []);

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/api/review/${reviewId}`);
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

  const getProductImageUrlById = (productId) => {
    const product = productData.find(product => product.id === productId);
    return product ? product.imgUrl : "https://via.placeholder.com/150"; // Fallback image
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="center" mb="20px">
        <Text fontSize="2xl" fontWeight="bold">Users Reviews</Text>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px">
        {reviewData.map((review) => (
          <Box key={review.id} bg="white" boxShadow="lg" borderRadius="xl" p="4">
            <Flex alignItems="center" mb="2">
              <Image
                src={getProductImageUrlById(review.productId)}
                alt="Product Image"
                borderRadius="xl"
                mb="4"
                boxSize="150px"
                objectFit="cover"
              />
              <Text color={textColor} fontSize="lg" fontWeight="bold" ml="4">
                {getUserNameById(review.userId)}
              </Text>
            </Flex>
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
