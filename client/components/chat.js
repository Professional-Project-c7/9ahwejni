
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { TextInput, IconButton, Card, Text } from 'react-native-paper';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS } from 'react-native-permissions';
import { ipAdress } from '../config';
import user from '../image/user.png';

const SERVER_ENDPOINT = `http://${ipAdress}:4001`;

const Chat = ({ navigation, route }) => {
  const { roomId, roomName } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [userId, setUserId] = useState('');
  const [socket, setSocket] = useState(null);
  const [recording, setRecording] = useState(false);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const [currentAudio, setCurrentAudio] = useState(null);

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

  const startRecording = async () => {
    const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (result === 'granted') {
      const path = RNFS.DocumentDirectoryPath + '/voiceMessage.m4a';
      await audioRecorderPlayer.startRecorder(path);
      audioRecorderPlayer.addRecordBackListener((e) => {});
      setRecording(true);
    }
  };

  const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecording(false);
    setCurrentAudio(result);
  };

  const playAudio = async (path) => {
    await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
      }
    });
  };

  const sendAudioMessage = async () => {
    if (socket && currentAudio) {
      const audioPath = currentAudio;
      const newMessage = {
        senderId: userId,
        content: audioPath,
        roomId: roomId,
        timestamp: new Date(),
        isAudio: true,
      };

      socket.emit('send_message', newMessage, async (acknowledgement) => {
        if (acknowledgement === 'success') {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          const formData = new FormData();
          formData.append('audio', {
            uri: `file://${audioPath}`,
            type: 'audio/m4a',
            name: 'voiceMessage.m4a',
          });
          formData.append('senderId', userId);
          formData.append('roomId', roomId);
          formData.append('isAudio', true);

          await axios.post(`http://${ipAdress}:3000/api/messages/audio`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          setCurrentAudio(null);
        } else {
          console.error('Failed to send message:', acknowledgement);
        }
      });
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
                    <Text style={styles.audioText}>Play Audio Message</Text>
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
          <IconButton
            icon={recording ? "stop" : "microphone"}
            color="#dba617"
            size={30}
            onPress={recording ? stopRecording : startRecording}
            style={styles.sendButton}
          />
          {currentAudio && (
            <IconButton
              icon="send"
              color="#dba617"
              size={30}
              onPress={sendAudioMessage}
              style={styles.sendButton}
            />
          )}
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
  audioText: {
    fontSize: 16,
    color: '#dba617',
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
  userImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
    overflow: 'hidden'
  },
});

export default Chat;