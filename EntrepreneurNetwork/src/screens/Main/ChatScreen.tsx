// ChatScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { LinearGradient } from 'expo-linear-gradient';

const initialMessages = [
  { id: '1', sender: 'friend', text: 'Hey, how are you?' },
  { id: '2', sender: 'me', text: 'I’m good, how about you?' },
  { id: '3', sender: 'friend', text: 'Doing great! Are we still on for today?' },
];

const ChatScreen = ({ route }) => {
  const { name, image, updateLastMessage } = route.params; // Get parameters from navigation
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObject = { id: `${messages.length + 1}`, sender: 'me', text: newMessage };
      const updatedMessages = [...messages, newMessageObject];
      setMessages(updatedMessages);
      setNewMessage('');

      // Update the last message in MessageScreen
      if (updateLastMessage) {
        updateLastMessage(name, newMessage);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <TouchableOpacity onPress={() => navigation.navigate('Message')}>
          <Text style={styles.username}>{name}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.friendMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      </View>
  );
};

export default ChatScreen;

// ...styles (same as before)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdddfc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    backgroundColor:'#6a89a7'
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  messageList: {
    padding: 15,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '70%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#7793c2',
  },
  friendMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDEDED',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor:'#fff',
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0084FF',
    borderRadius: 20,
    padding: 10,
  },
});
