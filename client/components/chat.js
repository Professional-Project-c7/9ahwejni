import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ipAdress } from '../config';
import moment from 'moment';

const SERVER_ENDPOINT = `http://${ipAdress}:4001`;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState('global');
  const [availableRooms, setAvailableRooms] = useState(['global', 'room1', 'room2']);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('IdUser');
        const name = await AsyncStorage.getItem('UserName');
        if (value !== null && name !== null) {
          const id = JSON.parse(value);
          setUserId(id);
          setUserName(name);
          establishSocketConnection(id, name, room);
          fetchMessages(room);
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
  }, [room]);

  const establishSocketConnection = (id, name, room) => {
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(SERVER_ENDPOINT, {
      query: { userId: id, room },
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    newSocket.on('receive_message', (message) => {
      console.log('Message received:', message);
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
    console.log('Send button pressed');
    if (socket && messageInput.trim()) {
      console.log('Socket exists and message input is not empty');
      const newMessage = {
        senderId: userId,
        senderName: userName,
        content: messageInput,
        room,
        timestamp: Date.now(),
      };

      console.log('Sending message:', newMessage);

      socket.emit('send_message', newMessage, (acknowledgement) => {
        console.log('Message send acknowledgement:', acknowledgement);
        if (acknowledgement === 'success') {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          saveMessage(newMessage);
        } else {
          console.error('Failed to send message:', acknowledgement);
        }
      });

      setMessageInput('');
    } else {
      console.log('Socket does not exist or message input is empty');
    }
  };

  const formatTimestamp = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  return (
    <ImageBackground source={require('../image/bgg.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Picker selectedValue={room} onValueChange={(value) => setRoom(value)} style={styles.roomPicker}>
          {availableRooms.map((room, index) => (
            <Picker.Item key={index} label={room} value={room} />
          ))}
        </Picker>
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.senderId === userId ? styles.sender : styles.receiver,
              ]}
            >
              <Text style={styles.messageText}>
                {message.senderId === userId ? 'You' : message.senderName}: {message.content}
              </Text>
              <Text style={styles.timestamp}>{formatTimestamp(message.timestamp)}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={messageInput}
            onChangeText={setMessageInput}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

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
  },
  receiver: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#dba617',
  },
  sendButton: {
    backgroundColor: '#dba617',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    marginLeft: 4,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chat;
