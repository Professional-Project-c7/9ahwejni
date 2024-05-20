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
  const [productImageUrls, setProductImageUrls] = useState([]);

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
        setUserData(response.data); // Remove filtering here
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  const getProductImageUrl = async (productId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/api/product/myProducts`);
      return response.data.imageUrl;
    } catch (error) {
      console.error("Error fetching product image URL: ", error);
      return null;
    }
  };
  

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
      <Text fontSize="2xl" fontWeight="bold">Users Reviews</Text>
    </Flex>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px">
      {reviewData.map((review, index) => {
        const productImageUrl = productImageUrls.find(item => item.productId === review.productId)?.imageUrl || null;
        return (
          <Box key={index} bg="white" boxShadow="lg" borderRadius="xl" p="4">
            <Flex alignItems="center" mb="2">
            {/* <Image
              src={ }
              alt="Product Image"
              borderRadius="xl"
              mb="4"
            /> */}
               {/* <Image src={productImageUrl} alt={review.productName} boxSize="50px" mr="4" /> */}
              <Text color={textColor} fontSize="lg" fontWeight="bold"> {getUserNameById(review.userId)}</Text>
            </Flex>
            <Text color={textColor} fontSize="md" mb="4">{review.comment}</Text>
            <Flex justifyContent="flex-end">
              <Button onClick={() => deleteReview(review.id, review.productId)} colorScheme="red" leftIcon={<DeleteIcon />} variant="outline">
                Delete Review
              </Button>
            </Flex>
          </Box>
        );
      })}
    </SimpleGrid>
  </Box>

  );
}
