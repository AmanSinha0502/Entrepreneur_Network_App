import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

// Initial sample data for messages
const initialMessages = [
  { id: '1', name: 'Aman Sinha', message: 'Have a nice day, bro!', time: 'now', image: 'https://via.placeholder.com/40' },
  { id: '2', name: 'Ayesha', message: 'I heard this is a good movie, s...', time: 'now', image: 'https://via.placeholder.com/40' },
  { id: '3', name: 'Dhairya Limbani', message: 'Have a nice day, bro!', time: 'now', image: 'https://via.placeholder.com/40' },
  { id: '4', name: 'Pancham Ganesh', message: 'I heard this is a good movie, s...', time: 'now', image: 'https://via.placeholder.com/40' },
  { id: '5', name: 'Ahmed', message: 'Have a nice day, bro!', time: 'now', image: 'https://via.placeholder.com/40' },
  { id: '6', name: 'imdadulla', message: 'I heard this is a good movie, s...', time: 'now', image: 'https://via.placeholder.com/40' },
  { id: '7', name: 'juveria', message: 'Have a nice day, bro!', time: 'now', image: 'https://via.placeholder.com/40' },
  { id: '8', name: 'husna', message: 'I heard this is a good movie, s...', time: 'now', image: 'https://via.placeholder.com/40' },
 
  // Add more messages...
];

const MessageScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const navigation = useNavigation();

  // Function to update the last message in the list
  const updateLastMessage = (name, newMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.name === name ? { ...msg, message: newMessage, time: 'now' } : msg
      )
    );
  };

  return (
 
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
          <Text style={styles.username}>jacob_w</Text>
          <View />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#000"
          />
        </View>

        {/* Message List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', { name: item.name, image: item.image, updateLastMessage })
              }
            >
              <MessageItem message={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.messageList}
        />
      </View>
  );
};

const MessageItem = ({ message }) => (
  <View style={styles.messageItem}>
    <Image source={{ uri: message.image }} style={styles.avatar} />
    <View style={styles.messageInfo}>
      <Text style={styles.name}>{message.name}</Text>
      <Text style={styles.messageText}>{message.message}</Text>
    </View>
    <Text style={styles.time}>{message.time}</Text>
  </View>
);

export default MessageScreen;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#bdddfc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    backgroundColor: '#6a89a7', // Optional, to match the gradient's top color
  },
  username: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    // backgroundColor: '#fff',
  },
  searchInput: {
    // backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  messageList: {
    paddingBottom: 15,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor:'#2d4961',
    borderRadius:40,

  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageInfo: {
    flex: 1,
  },
  name: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  messageText: {
    color: '#999999',
  },
  time: {
    color: 'white',
    marginRight: 10,
  },
});
