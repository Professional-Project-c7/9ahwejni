
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Badge, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const dummyData = [
  { id: '1', name: 'Kerry Lakin', message: 'Love it! - now', avatar: 'https://placekitten.com/200/200', online: true },
  { id: '2', name: 'Shopaholics', message: 'This dress? 👗 or 👚 - 9m', avatar: 'https://placekitten.com/201/201', online: false },
  { id: '3', name: 'Corey Ponder', message: '🤝👊🏾 - 37m', avatar: 'https://placekitten.com/202/202', online: false },
  { id: '4', name: 'Jessie Kim', message: 'Sent a sticker - 8:24am', avatar: 'https://placekitten.com/203/203', online: true },
  { id: '5', name: 'Taylor Ward', message: 'Your call! - Mon', avatar: 'https://placekitten.com/204/204', online: false },
  { id: '6', name: 'Amy & Leon', message: 'I vote for skiing! - Mon', avatar: 'https://placekitten.com/205/205', online: true },
  { id: '7', name: 'Mia Reynolds', message: '', avatar: 'https://placekitten.com/206/206', online: false },
];

const MessageList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);
  const navigation = useNavigation();

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setFilteredData(
      dummyData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleRoomSelect = (roomId, roomName) => {
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
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRoomSelect(item.id, item.name)}>
            <View style={styles.itemContainer}>
              <Avatar.Image size={48} source={{ uri: item.avatar }} />
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.online && <Badge size={8} style={styles.badge} />}
                </View>
                <Text style={styles.message}>{item.message}</Text>
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
});

export default MessageList;
