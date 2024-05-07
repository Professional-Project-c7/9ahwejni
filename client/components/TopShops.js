import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { ipAdress } from '../config';

// const TopShops = () => {
//     const [coffeeShops, setCoffeeShops] = useState([]);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       const fetchCoffeeShops = async () => {
//         try {
//           const response = await axios.get(`http://${ipAdress}:3000/api/user/`);
//           setCoffeeShops(response.data);
//         } catch (err) {
//           setError(err.message);
//         }
//       };
  
//       fetchCoffeeShops();
//     }, []);
  
//     if (error) {
//       return <Text>Error: {error}</Text>;
//     }
  

const dummyData = [
  {
    id: 1,
    FirstName: 'John',
    LastName: 'Doe',
    Address: '123 Coffee Street',
    ImageUrl: 'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 2,
    FirstName: 'Jane',
    LastName: 'Smith',
    Address: '456 Java Avenue',
    ImageUrl: 'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    reviews: 34,
  },
  {
    id: 3,
    FirstName: 'Paul',
    LastName: 'Jones',
    Address: '789 Mocha Road',
    ImageUrl: 'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.3,
    reviews: 21,
  },
  {
    id: 4,
    FirstName: 'Emily',
    LastName: 'Davis',
    Address: '101 Latte Lane',
    ImageUrl: 'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    reviews: 45,
  },
];

const TopShops = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.ImageUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.FirstName} {item.LastName}</Text>
              <Text style={styles.address}>{item.Address}</Text>
              <View style={styles.ratingSection}>
                <Text style={styles.ratingText}>{`${item.rating} (${item.reviews} reviews)`}</Text>
              </View>
            </View>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    width: 200,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    color: '#555',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default TopShops;
