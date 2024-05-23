import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Badge, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ipAdress } from '../config'; // Make sure you have the correct IP address

const MessageList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [coffeeShopsData, setCoffeeShopsData] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:3000/api/user`);
        const filteredShops = response.data.filter(user => user.UserType === 'coffee');
        setCoffeeShopsData(filteredShops);
        setFilteredData(filteredShops);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchData();
  }, []);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setFilteredData(
      coffeeShopsData.filter((item) =>
        item.FirstName.toLowerCase().includes(query.toLowerCase()) ||
        item.LastName.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleRoomSelect = (index, roomName) => {
    const roomId = index + 1;
    navigation.navigate('chat', { roomId, roomName });
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleRoomSelect(index, `${item.FirstName} ${item.LastName}`)}>
            <View style={styles.itemContainer}>
              <Avatar.Image size={48} source={{ uri: item.ImageUrl }} />
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.name}>{item.FirstName} {item.LastName}</Text>
                  {item.online && <Badge size={8} style={styles.badge} />}
                </View>
                <Text style={styles.message}>{item.Message || 'No recent message'}</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#888" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 10,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#888',
  },
  badge: {
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default MessageList;
