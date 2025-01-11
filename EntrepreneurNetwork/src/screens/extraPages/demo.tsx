import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SimplePostScreen = () => {
  const [textInput, setTextInput] = useState<string>(''); // Text input state
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Image state
  const [posts, setPosts] = useState<{ text: string; image: string | null }[]>([]); // Posts array

  const handleImagePicker = async () => {
    Alert.alert(
      'Select Option',
      'Choose an image source',
      [
        {
          text: 'Take Picture',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) {
              setSelectedImage(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Upload from Device',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) {
              setSelectedImage(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handlePost = () => {
    if (!textInput.trim() && !selectedImage) {
      Alert.alert('Error', 'Please add text or an image before posting.');
      return;
    }
    // Add to posts and clear inputs
    setPosts([...posts, { text: textInput, image: selectedImage }]);
    setTextInput('');
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {/* Input Section */}
      <TextInput
        style={styles.textInput}
        placeholder="What's on your mind?"
        placeholderTextColor="#888"
        value={textInput}
        onChangeText={setTextInput}
      />
      <TouchableOpacity onPress={handleImagePicker} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>

      {/* Preview Section */}
      {selectedImage && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Image Preview:</Text>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        </View>
      )}

      {textInput ? (
        <Text style={styles.previewText}>Text Preview: {textInput}</Text>
      ) : null}

      <Button title="Post" onPress={handlePost} color="#007bff" />

      {/* Posts Section */}
      <Text style={styles.postsHeader}>Your Posts:</Text>
      {posts.map((post, index) => (
        <View key={index} style={styles.postItem}>
          {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
          {post.text ? <Text style={styles.postText}>{post.text}</Text> : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  previewText: {
    fontSize: 16,
    marginBottom: 5,
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  postsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  postItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
  },
});

export default SimplePostScreen;
