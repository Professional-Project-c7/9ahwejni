import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, ScrollView, Image, FlatList } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Posts = () => {
  const data = [
    {
      id: 1,
      title: 'Lorem ipsum dolor',
      time: '',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    },
    {
      id: 2,
      title: 'Sit amet, consectetuer',
      time: '2 minutes a go',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cofee_Espresso_in_french_cafe.jpg/1200px-Cofee_Espresso_in_french_cafe.jpg',
    },
    {
      id: 3,
      title: 'Dipiscing elit. Aenean ',
      time: '3 hour a go',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    },
    {
      id: 4,
      title: 'Commodo ligula eget dolor.',
      time: '4 months a go',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    },
    {
      id: 5,
      title: 'Aenean massa. Cum sociis',
      time: '5 weeks a go',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    },
    {
      id: 6,
      title: 'Natoque penatibus et magnis',
      time: '6 year a go',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    },
    {
      id: 7,
      title: 'Dis parturient montes, nascetur',
      time: '7 minutes a go',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    },
    {
      id: 8,
      title: 'Ridiculus mus. Donec quam',
      time: '8 days a go',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    },
    {
      id: 9,
      title: 'Felis, ultricies nec, pellentesque',
      time: '9 minutes a go',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    },
  ];

  const [posts, setPosts] = useState(data);
  const [isFormVisible, setFormVisible] = useState(false);

  const deletePost = (id) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image style={styles.cardImage} source={{ uri: item.image }} />
        <View style={styles.cardContent}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deletePost(item.id)}>
          <Icon name="heart" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.icon}>
      {/* <Icon name="close" size={25}  style={styles.option} onPress={() => navigation.navigate('User')}/> */}
      
      </View>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          style={styles.container}
          data={posts}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={renderPostItem}
        />
      </ScrollView>
     
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFormVisible}
        onRequestClose={() => {
          setFormVisible(!isFormVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Your form components here */}
            <TouchableOpacity
              style={{ ...styles.closeButton, backgroundColor: '#2196F3' }}
              onPress={toggleFormVisibility}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    shadowColor: 'white',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardImage: {
    width: 180,
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: 'black',
    marginTop: 45,
  },
  time: {
    fontSize: 13,
    color: 'black',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#f4511e',
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  icon: {
    width: 25,
    height: 25,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Posts;
