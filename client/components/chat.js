import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform, PermissionsAndroid } from 'react-native';
import { TextInput, IconButton, Card, Text } from 'react-native-paper';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { ipAdress } from '../config';
import user from '../image/user.png';

const SERVER_ENDPOINT = `http://${ipAdress}:4001`;

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // iOS permissions can be handled differently if needed
    return true;
  }
};

const requestAudioPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Permission',
          message: 'This app needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // iOS permissions can be handled differently if needed
    return true;
  }
};

const Chat = ({ navigation, route }) => {
  const { roomId, roomName } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [userId, setUserId] = useState('');
  const [socket, setSocket] = useState(null);
  const [recording, setRecording] = useState(false);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const [currentAudio, setCurrentAudio] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('IdUser');
        if (value !== null) {
          const id = JSON.parse(value);
          setUserId(id);
          establishSocketConnection(id, roomId);
          await fetchMessages(roomId);
          scrollViewRef.current.scrollToEnd({ animated: true });
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
      scrollViewRef.current.scrollToEnd({ animated: true });
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
          scrollViewRef.current.scrollToEnd({ animated: true });
        } else {
          console.error('Failed to send message:', acknowledgement);
        }
      });

      setMessageInput('');
    }
  };

  const startRecording = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) {
      console.log('Audio permission denied');
      return;
    }

    const path = RNFS.DocumentDirectoryPath + '/voiceMessage.m4a';
    await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e) => {});
    setRecording(true);
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

          try {
            const response = await axios.post(`http://${ipAdress}:3000/api/messages/audio`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Update the message content with the correct URL from the server response
            newMessage.content = response.data.message.content;
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              updatedMessages[updatedMessages.length - 1] = newMessage;
              return updatedMessages;
            });

            setCurrentAudio(null);
            scrollViewRef.current.scrollToEnd({ animated: true });
          } catch (error) {
            console.error('Failed to upload audio:', error);
          }
        } else {
          console.error('Failed to send message:', acknowledgement);
        }
      });
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        console.log('Selected Image URI: ', uri); // Log the selected image URI
        setSelectedImage(uri);
        uploadImage(uri);
      } else {
        console.error('No image captured');
      }
    });
  };

  const launchCameraToTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log('Camera permission denied');
      return;
    }

    const options = {
      mediaType: 'photo',
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.error('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        console.log('Captured Image URI: ', uri); // Log the captured image URI
        setSelectedImage(uri);
        uploadImage(uri);
      } else {
        console.error('No image captured');
      }
    });
  };

  const retry = async (fn, retriesLeft = 5, interval = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retriesLeft <= 0) throw error;
      await new Promise(resolve => setTimeout(resolve, interval));
      return retry(fn, retriesLeft - 1, interval);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);

    const uploadFn = async () => {
      const formData = new FormData();
      formData.append('image', {
        uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('senderId', userId);
      formData.append('roomId', roomId);
      formData.append('isImage', true);

      const response = await axios.post(`http://${ipAdress}:3000/api/messages/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data.message.content;
    };

    try {
      const filePath = await retry(uploadFn);
      sendImageMessage(filePath); // Send the message with the correct file path
    } catch (error) {
      console.error('Failed to upload image after multiple attempts:', error);
    } finally {
      setUploading(false);
    }
  };

  const sendImageMessage = (filePath) => {
    if (socket && filePath) {
      const newMessage = {
        senderId: userId,
        content: filePath,
        roomId: roomId, 
        timestamp: new Date(),
        isImage: true,
      };

      socket.emit('send_message', newMessage, (acknowledgement) => {
        if (acknowledgement === 'success') {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          saveMessage(newMessage);
          scrollViewRef.current.scrollToEnd({ animated: true });
        } else {
          console.error('Failed to send message:', acknowledgement);
        }
      });

      setSelectedImage(null);
    }
  };

  return (
    <ImageBackground source={require('../image/pggg.png')} style={styles.background}>
      <View style={styles.container}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.messagesContainer}>
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
                ) : message.isImage ? (
                  <Image source={{ uri: message.content }} style={styles.imageMessage} onError={(e) => console.log('Image Error: ', e.nativeEvent.error)} />
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
          {messageInput.trim() ? (
            <IconButton
              icon="send"
              color="#dba617"
              size={30}
              onPress={sendMessage}
              style={styles.sendButton}
            />
          ) : (
            <>
              <IconButton
                icon={recording ? "stop" : "microphone"}
                color="#dba617"
                size={30}
                onPress={recording ? stopRecording : startRecording}
                style={styles.sendButton}
              />
              <IconButton
                icon="image"
                color="#dba617"
                size={30}
                onPress={selectImage}
                style={styles.sendButton}
              />
              <IconButton
                icon="camera"
                color="#dba617"
                size={30}
                onPress={launchCameraToTakePhoto}
                style={styles.sendButton}
              />
            </>
          )}
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
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
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
