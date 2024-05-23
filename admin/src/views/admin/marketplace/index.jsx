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
var myImg =productData.map(e=>(e.imgUrl))
var name = productData.map(e=>(e.name))
const image = userData.map (e=>(e.ImageUrl))
const users = userData.map(e=>(e.FirstName))
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
     const response= await axios.delete(`http://localhost:3000/api/review/${reviewId}`);
      setReviewData(response.data);
    } catch (error) {
      console.error("Error deleting review: ", error);
     
    }
  };

  const getUserNameById = (userId) => {
    const user = userData.find((user) => user.id === userId);
    return user ? user.FirstName : "Unknown";
  };

  const getProductImageUrlById = (productId) => {
    const product = productData.find((product) => product.id === productId);
    return product ? product.imgUrl : "https://via.placeholder.com/150"; // Fallback image
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="center" mb="20px">
        <Text fontSize="2xl" fontWeight="bold">Users Reviews</Text>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px">
        {reviewData.map((review,index) => (
            <Box key={review.id} bg="white"  boxShadow="lg" borderRadius="xl" p="4"    transition="transform 0.2s, box-shadow 0.2s, background-color 0.2s"
            _hover={{ transform: "scale(1.05)", boxShadow: "x50", bg: "black.100" }}>
            <Flex alignItems="center" mb="2">
              <Image
                src={myImg[index]}
                alt="Product"
                borderRadius="xl"
                mb="4"
                boxSize="300px"
                height="12rem"
                marginLeft="14px" 
              marginTop='10px'
               objectFit="cover"
              />
             
             
            </Flex>
            <Text color={textColor} fontSize="lg" textAlign="center" marginTop="-17px" fontWeight="bold" ml="4">
                {/* {getUserNameById(review.userId)} */}
               {name[index]}
              </Text>
            <div  style={{ display: 'flex', alignItems: 'center' }}>
           
              <Image
                src={image[index]}
                alt="Product"
                borderRadius="100"
                mb="4"
                boxSize="40px"
                objectFit="cover"
              />
               <Text color={textColor} fontSize="lg" fontWeight="bold" ml="4" marginTop="-13px">
                {users[index]}
              
              </Text>
              </div>
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
