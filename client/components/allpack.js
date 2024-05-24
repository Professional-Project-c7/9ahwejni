import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  LogBox
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { ipAdress } from '../config';
import packos from '../image/packos.png';
// import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); //Hide warnings

LogBox.ignoreAllLogs()
const Allpack = ({ navigation }) => {
  const [packs, setPacks] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const packsResponse = await axios.get(`http://${ipAdress}:3000/api/packs`);
        const reviewsResponse = await axios.get(`http://${ipAdress}:3000/api/packreview`);
  
        console.log('Packs Response:', packsResponse.data); 
        console.log('Reviews Response:', reviewsResponse.data); 
  
        const packsWithReviews = packsResponse.data.map(pack => {
          const packReviews = reviewsResponse.data.filter(review => review.PackId === pack.id);
          const totalReviews = packReviews.length;
          const averageRating = totalReviews ? packReviews.reduce((acc, review) => acc + review.stars, 0) / totalReviews : 0;
          return {
            ...pack,
            totalReviews,
            averageRating: averageRating.toFixed(1),
          };
        });
  
        setPacks(packsWithReviews);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPacks();
  }, []);
  

  const toggleFeature = async (id, feature) => {
    try {
      const isFavorited = favorites[id]?.[feature];
      const pack = packs.find((pack) => pack.id === id);
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      if (!isFavorited) {
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [id]: {
            ...prevFavorites[id],
            [feature]: true,
          },
        }));
        favoritesArray.push(pack);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

        ToastAndroid.showWithGravity('Item added to cart', ToastAndroid.SHORT, ToastAndroid.TOP);
      }
    } catch (error) {
      console.log('Error toggling feature:', error);
    }
  };

  const handleNavigateToDetails = async (pack) => {
    try {
      await AsyncStorage.setItem('selectedProductId', pack.id.toString());
      navigation.navigate('pck', { product: pack });
    } catch (error) {
      console.log('Error storing selected product ID:', error);
    }
  };

  const filteredPacks = packs.filter(pack =>
    pack.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(219, 166, 23, 1)', 'rgba(219, 166, 23, 1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Packs</Text>
          <Image source={packos} style={styles.packosImage} />
        </View>
      </LinearGradient>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search packs..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <ScrollView>
        {error ? (
          <Text>Error: {error}</Text>
        ) : (
          <View style={styles.productsContainer}>
            {filteredPacks.map((pack) => (
              <View style={styles.card} key={pack.id}>
                <TouchableOpacity onPress={() => handleNavigateToDetails(pack)}>
                  <Image source={{ uri: pack.imgUrl }} style={styles.image} />
                </TouchableOpacity>
                <Icon
                  name={favorites[pack.id]?.favored ? 'heart' : 'heart-outline'}
                  color={favorites[pack.id]?.favored ? 'red' : '#dba617'}
                  size={27}
                  style={styles.favIcon}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.reviews}>{`${pack.totalReviews} 👤 ⭐: ${pack.averageRating}`}</Text>
                  <Text style={styles.name}>{pack.name}</Text>
                  <Text style={styles.price}>${pack.price}</Text>
                  <Icon
                    name={favorites[pack.id]?.inCart ? 'cart' : 'cart-outline'}
                    size={24}
                    onPress={() => toggleFeature(pack.id, 'inCart')}
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
    backgroundColor: '#fff',
  },
  gradientBackground: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    marginHorizontal: 0,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  packosImage: {
    width: 30,
    height: 30,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderColor: '#dba617',
    borderWidth: 2,
    margin: 20,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    color: '#424242',
    fontSize: 18,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    height: 250,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  favIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  infoContainer: {
    padding: 12,
    width: '100%',
    position: 'relative',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  reviews: {
    fontSize: 14,
    color: '#999',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cartIcon: {
    position: 'absolute',
    right: 10,
    bottom: 5,
    backgroundColor: '#dba617',
    padding: 5,
    borderRadius: 15,
  },
});

export default Allpack;