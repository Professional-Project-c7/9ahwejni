// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   View,
//   Image,
//   Text,
//   TouchableOpacity,

// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useNavigation } from '@react-navigation/native';

// import { Rating } from 'react-native-ratings';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import axios from 'axios';
// import { ipAdress } from '../config';

// const RandomProducts = () => {
//   const navigation = useNavigation(); // Use the useNavigation hook here

//   const [products, setProducts] = useState([]);
//   const [favorites, setFavorites] = useState({});
  
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`http://${ipAdress}:3000/api/product/`);
//         const shuffledProducts = response.data.sort(() => 0.5 - Math.random());
//         setProducts(shuffledProducts.slice(0, 4));
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchProducts();
//     // AsyncStorage.setItem("rami",JSON.stringify([21,5,3]))
//   }, []);

//   const toggleFeature = (id, feature) => {
//     setFavorites(prev => ({
//       ...prev,
//       [id]: { ...prev[id],
//         [feature]: !prev[id]?.[feature],},}));
//     if (!favorites[id]?.[feature]) {
//       AsyncStorage.setItem(`rami`, JSON.stringify([...favorites,products.find(product => product.id === id)]));
//     } else {
//       AsyncStorage.removeItem(`rami`);
//     }
    
//   };
// // console.log("stored",AsyncStorage.getItem("rami"));

// console.log("favorites",favorites);
//   const handleNavigateToDetails = (product) => { 
//     navigation.navigate('prd', { product }); 
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {error ? (
//           <Text>Error: {error}</Text>
//         ) : (
//           <View style={styles.productsContainer}>
//             {products.map((product) => (
//               <View style={styles.card} key={product.id}>
//                 <TouchableOpacity onPress={() => handleNavigateToDetails(product)}>
//                   <Image source={{ uri: product.imgUrl }} style={styles.image} />
//                 </TouchableOpacity>
//                 <Icon
//                   name={favorites[product.id]?.favored ? 'heart' : 'heart-outline'}
//                   color={favorites[product.id]?.favored ? 'red' : '#dba617'}
//                   size={27}
//                   // onPress={() => toggleFeature(product.id, 'favored')}
//                   style={styles.favIcon}
//                 />
//                 <View style={styles.infoContainer}>
//                   <TouchableOpacity onPress={() => handleNavigateToDetails(product)}>
//                     <Text style={styles.name}>{product.name}</Text>
//                   </TouchableOpacity>
//                   <Text style={styles.price}>${product.price}</Text>
//                   <Rating
//                     type="star"
//                     ratingCount={5}
//                     imageSize={20}
//                     startingValue={product.rating}
//                     onFinishRating={(rating) => console.log('New rating is: ', rating)}
//                     style={styles.starRating}
//                   />
//                   <Icon
//                     name={favorites[product.id]?.inCart ? 'cart' : 'cart-outline'}
//                     color={favorites[product.id]?.inCart ? 'red' : 'white'}
//                     size={24}
//                     onPress={() => toggleFeature(product.id, 'inCart')}
//                     style={styles.cartIcon}
//                   />
//                 </View>
//               </View>
//             ))}
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   productsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-evenly',
//   },
//   card: {
//     width: 189,
//     margin: 1,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     borderColor: '#ccc',
//     borderWidth: 1.5,
//     marginTop: 12,
//   },
//   image: {
//     height: 210,
//     width: '100%',
//     alignSelf: 'center',
//   },
//   favIcon: {
//     position: 'absolute',
//     right: 10,
//     top: 10,
//   },
//   infoContainer: {
//     padding: 10,
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     width: '100%',
//     position: 'relative',
//   },
//   name: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: '#000',
//     flexWrap: 'wrap',
//   },
//   price: {
//     fontSize: 20,
//     color: '#000',
//     marginTop: 5,
//   },
//   starRating: {
//     marginTop: 5,
//   },
//   cartIcon: {
//     position: 'absolute',
//     right: 5,
//     bottom: 1,
//     backgroundColor: '#dba617',
//     padding: 8,
//     borderRadius: 15,
//   },
// });

// export default RandomProducts;




import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { ipAdress } from '../config';

const RandomProducts = () => {
  const navigation = useNavigation(); // Use the useNavigation hook here

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/product/`);
        const shuffledProducts = response.data.sort(() => 0.5 - Math.random());
        setProducts(shuffledProducts.slice(0, 4));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
    // AsyncStorage.clear()
  }, []);

  const toggleFeature = async (id, feature) => {
    try {
      // Check if the product is already favorited
      const isFavorited = favorites[id]?.[feature];

      // Get the product from the products array
      const product = products.find((product) => product.id === id);

      // Fetch existing favorites array from AsyncStorage
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];

      // If the product is not favorited, add it to favorites array and AsyncStorage
      if (!isFavorited) {
        // Update the favorites state
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [id]: {
            ...prevFavorites[id],
            [feature]: true,
          },
        }));

        // Add the product to favorites array
        favoritesArray.push(product);

        // Save updated favorites array to AsyncStorage
        await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      } else {
        // If the product is already favorited, remove it from favorites array and AsyncStorage
        setFavorites((prevFavorites) => {
          const updatedFavorites = { ...prevFavorites };
          delete updatedFavorites[id][feature];
          return updatedFavorites;
        });

        // Remove the product from favorites array
        favoritesArray = favoritesArray.filter((favProduct) => favProduct.id !== id);

        // Save updated favorites array to AsyncStorage
        await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      }
    } catch (error) {
      console.log('Error toggling feature:', error);
    }
  };

  const handleNavigateToDetails = (product) => { 
    navigation.navigate('prd', { product }); 
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {error ? (
          <Text>Error: {error}</Text>
        ) : (
          <View style={styles.productsContainer}>
            {products.map((product) => (
              <View style={styles.card} key={product.id}>
                <TouchableOpacity onPress={() => handleNavigateToDetails(product)}>
                  <Image source={{ uri: product.imgUrl }} style={styles.image} />
                </TouchableOpacity>
                <Icon
                  name={favorites[product.id]?.favored ? 'heart' : 'heart-outline'}
                  color={favorites[product.id]?.favored ? 'red' : '#dba617'}
                  size={27}
                  // onPress={() => toggleFeature(product.id, 'favored')}
                  style={styles.favIcon}
                />
                <View style={styles.infoContainer}>
                  <TouchableOpacity onPress={() => handleNavigateToDetails(product)}>
                    <Text style={styles.name}>{product.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.price}>${product.price}</Text>
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={20}
                    startingValue={product.rating}
                    onFinishRating={(rating) => console.log('New rating is: ', rating)}
                    style={styles.starRating}
                  />
                  <Icon
                    name={favorites[product.id]?.inCart ? 'cart' : 'cart-outline'}
                    color={favorites[product.id]?.inCart ? 'red' : 'white'}
                    size={24}
                    onPress={() => toggleFeature(product.id, 'inCart')}
                    style={styles.cartIcon}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  card: {
    width: 189,
    margin: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1.5,
    marginTop: 12,
  },
  image: {
    height: 210,
    width: '100%',
    alignSelf: 'center',
  },
  favIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  infoContainer: {
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    position: 'relative',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 20,
    color: '#000',
    marginTop: 5,
  },
  starRating: {
    marginTop: 5,
  },
  cartIcon: {
    position: 'absolute',
    right: 5,
    bottom: 1,
    backgroundColor: '#dba617',
    padding: 8,
    borderRadius: 15,
  },
});

export default RandomProducts;

