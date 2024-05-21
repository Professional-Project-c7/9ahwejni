import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { TextInput, IconButton, Card, Text } from 'react-native-paper';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { ipAdress } from '../config';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

const SERVER_ENDPOINT = `http://${ipAdress}:4001`;

const audioRecorderPlayer = new AudioRecorderPlayer();

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
        timestamp: new Date(),
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

  const playAudio = async (filePath) => {
    try {
      console.log('Playing audio from:', filePath);
      const result = await audioRecorderPlayer.startPlayer(filePath);
      if (result === 'success') {
        audioRecorderPlayer.addPlayBackListener((e) => {
          console.log({
            currentPosition: e.currentPosition,
            duration: e.duration,
          });
          if (e.currentPosition === e.duration) {
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
          }
        });
      } else {
        console.error('Failed to start audio player:', result);
        Alert.alert('Error', 'Failed to start audio player');
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Error', `Error playing audio: ${error.message}`);
    }
  };
  
  

  return (
      <ImageBackground source={require('../image/bgg.jpeg')} style={styles.background}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.messagesContainer}>
            {messages.map((message, index) => (
              <Card
                key={index}
                style={[
                  styles.message,
                  message.senderId === userId ? styles.sender : styles.receiver,
                ]}
              >
                <Card.Content>
                  {message.isAudio ? (
                    <TouchableOpacity onPress={() => playAudio(message.content)}>
                      <Text style={styles.audioMessage}>Play Audio</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <Text style={styles.messageText}>{message.content}</Text>
                      <Text style={styles.timestampText}>{moment(message.timestamp).fromNow()}</Text>
                    </>
                  )}
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              value={messageInput}
              onChangeText={setMessageInput}
              placeholder="Type a message..."
              mode="outlined"
              outlineStyle={styles.textInputOutline}
            />
            <IconButton
              icon="send"
              color="#dba617"
              size={30}
              onPress={sendMessage}
              style={styles.sendButton}
            />
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
  messagesContainer: {
    flexGrow: 1,
    padding: 10,
  },
  message: {
    marginVertical: 4,
    maxWidth: '70%',
    alignSelf: 'flex-start',
    borderRadius: 30,
  },
  sender: {
    backgroundColor: '#dba617',
    alignSelf: 'flex-end',
  },
  receiver: {
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestampText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'right',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#dba617',
  },
  messageInput: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#fff',
    borderColor: '#dba617',
  },
  textInputOutline: {
    borderRadius: 20,
  },
  sendButton: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  audioMessage: {
    fontSize: 16,
    color: '#dba617',
    textDecorationLine: 'underline',
  },
});

export default Chat;
