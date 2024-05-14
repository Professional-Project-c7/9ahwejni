// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the endpoint for the server
const SERVER_ENDPOINT = 'http://192.168.103.8:4001';

// Define the Chat component
function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [userId, setUserId] = useState('');
  const [socket, setSocket] = useState(null); // Store the socket instance

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('IdUser');
      if (value !== null) {
        const tokenObject = JSON.parse(value);
        const id = tokenObject;
        console.log("userId", id);
        setUserId(id);
        checkIfConnected(id); // Check if user is connected after getting userId
        establishSocketConnection(id); // Establish socket connection after getting userId
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const checkIfConnected = async (userId) => {
    try {
      const response = await fetch(`${SERVER_ENDPOINT}/isConnected`, {
        method: 'GET',
        headers: {
          'userid': userId
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("isConnected:", data.isConnected);
    } catch (error) {
      console.error('Error checking connection status:', error);
    }
  };

  const establishSocketConnection = (userId) => {
    const newSocket = io(SERVER_ENDPOINT, {
      query: {
        userId: userId
      }
    });
    setSocket(newSocket); // Store the socket instance

    // Function to handle receiving messages
    const receiveMessage = (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Register the receiveMessage function to listen for incoming messages
    newSocket.on('receive_message', receiveMessage);

    // Disconnect socket on component unmount
    return () => {
      newSocket.disconnect();
    };
  };

  // Function to handle sending messages
// Function to handle sending messages
const sendMessage = () => {
  console.log("Sending message...");
  const newMessage = {
    senderId: userId,
    content: messageInput,
    timestamp: new Date().toLocaleString(),
  };

  // Emit the message to the server
  // Note: We're using the stored socket instance here
  if (socket) {
    socket.emit('send_message', newMessage, (acknowledgement) => {
      // If the server acknowledges the message, do nothing
      if (acknowledgement !== 'success') {
        console.error('Failed to send message:', acknowledgement);
      }
    });
    console.log(newMessage);
  }

  // Clear the message input after sending
  setMessageInput('');
};



  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {messages.map((message, index) => (
  <View
    key={index}
    style={{
      flexDirection: 'row',
      justifyContent: message.senderId === userId ? 'flex-end' : 'flex-start',
      margin: 5,
    }}> 
    <View
      style={{
        backgroundColor: message.senderId === userId ? 'lightblue' : 'lightcoral',
        borderRadius: 8,
        padding: 8,
        maxWidth: '70%',
        alignSelf: message.senderId === userId ? 'flex-end' : 'flex-start',
      }}>
      <Text style={{ color: message.senderId === userId ? 'black' : 'white' }}>{message.content}</Text>
      <Text>{message.timestamp}</Text>
    </View>
  </View>
))}



      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderRadius: 4,
            paddingHorizontal: 8,
            margin: 4,
          }}
          placeholder="Type a message..."
          value={messageInput}
          onChangeText={setMessageInput}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({

})
export default Chat;
