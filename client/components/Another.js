import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  console.log("Fetched posts:", posts);

  const fetchData = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('favv');
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        console.log('Parsed posts:', parsedPosts); // Debugging: Log parsed posts
        setPosts(parsedPosts);
      } else {
        console.log('No posts found in AsyncStorage');
      }
    } catch (error) {
      console.log('Error fetching data:', error); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleDeleteItem = async (itemId) => {
    const updatedPosts = posts.filter(item => item.id !== itemId);
    setPosts(updatedPosts);
    try {
      await AsyncStorage.setItem('favv', JSON.stringify(updatedPosts));
    } catch (error) {
      console.log('Error updating favorites:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <Icon name="arrow-left" size={30} style={styles.backIcon} onPress={() => navigation.goBack()} />
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.card}>
            <Image style={styles.cardImage} source={{ uri: item.imgUrl }} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
                <MaterialIcon name="delete" size={24} color="#ff6347" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f3ef',
  },
  backIcon: {
    margin: 16,
    color: 'rgba(219, 166, 23, 1)',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  cardImage: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: '#6e695b',
    fontSize: 16,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  price: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#38761d',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  separator: {
    height: 2,
    backgroundColor: '#ececec',
  },
});

export default Favorites;
