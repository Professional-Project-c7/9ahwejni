import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

const ENDPOINT = 'http://localhost:4000';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(ENDPOINT);
    setSocket(socket);

    axios.get('http://192.168.11.70:3000/api/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });

    socket.on('new_message', receiveMessage);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const receiveMessage = (data) => {
    setMessages(prevMessages => [...prevMessages, data]);
  };

  const handleMessageChange = (text) => {
    setMessageInput(text);
  };

  const sendMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      content: messageInput,
      timestamp: new Date().toLocaleString(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageInput('');
    
    axios.post('http://192.168.11.70:3000/api/messages', newMessage)
      .then(response => {
        console.log('Message saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving message:', error);hee
      });

    if (socket) {
      socket.emit('send_message', newMessage);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <DefaultSidebar /> */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          {/* Sidebar content */}
        </View>
        <View style={{ flex: 3 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {messages.map((message, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: message.sender === 'You' ? 'flex-end' : 'flex-start' }}>
                <View style={{ backgroundColor: message.sender === 'You' ? 'lightblue' : 'lightgreen', borderRadius: 8, padding: 8, margin: 4 }}>
                  <Text>{message.content}</Text>
                  <Text>{message.timestamp}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={{ flex: 1, borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, margin: 4 }}
              placeholder="Type a message..."
              value={messageInput}
              onChangeText={handleMessageChange}
            />
            <Button title="Send" onPress={sendMessage} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Chat;
