import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';

const SERVER_ENDPOINT = `http://${ipAdress}:4001`;

const Chat = ({ navigation, route }) => {
  const { roomId, roomName } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [userId, setUserId] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('IdUser');
        if (value !== null) {
          const id = JSON.parse(value);
          setUserId(id);
          establishSocketConnection(id, roomId);
          fetchMessages(roomId);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    retrieveData();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [roomId]);

  const establishSocketConnection = (id, room) => {
    const newSocket = io(SERVER_ENDPOINT, {
      query: { userId: id, room },
    });

    newSocket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(newSocket);
  };

  const fetchMessages = async (room) => {
    try {
      const response = await axios.get(`http://${ipAdress}:3000/api/messages/${room}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const saveMessage = async (message) => {
    try {
      await axios.post(`http://${ipAdress}:3000/api/messages`, message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const sendMessage = () => {
    if (socket && messageInput.trim()) {
      const newMessage = {
        senderId: userId,
        content: messageInput,
        roomId: roomId,
      };

      socket.emit('send_message', newMessage, (acknowledgement) => {
        if (acknowledgement === 'success') {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          saveMessage(newMessage);
        } else {
          console.error('Failed to send message:', acknowledgement);
        }
      });

      setMessageInput('');
    }
  };

  return (
    <ImageBackground source={require('../image/bgg.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.message,
                message.senderId === userId ? styles.sender : styles.receiver,
              ]}
            >
              <Text style={styles.messageText}>{message.content}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            value={messageInput}
            onChangeText={setMessageInput}
            placeholder="Type a message..."
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
   background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  roomPicker: {
    backgroundColor: '#dba617',
    height: 50,
    width: 150,
    alignSelf: 'center',
    marginVertical: 10,
    marginLeft: 260,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 4,
    maxWidth: '70%',
    elevation: 1,
  },
  sender: {
    backgroundColor: '#dba617',
    alignSelf: 'flex-end',
    padding:15,
    borderRadius : 20 , 

  },
  receiver: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    padding:15,
    borderRadius : 20 , 

  },
  messageText: {
    fontSize: 20,
    color: '#333',
  },
 
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#dba617',
  },
  sendButton: {
    backgroundColor: '#dba617',
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    marginLeft: 4,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },

});

export default Chat;
