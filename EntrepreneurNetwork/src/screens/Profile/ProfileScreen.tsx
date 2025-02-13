import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import ScrollableScreen from '../../components/Common/ScrollableScreen';
import PostCard from '../../components/Cards/PostCard';
import Button from '../../components/Buttons/Button';
import { useAuth } from '../../context/AuthContext';
import { encode as btoa } from 'base-64';

interface Post {
  _id: string;
  text: string;
  username: string;
  image: {
    contentType: string;
    data: { data: number[] };
  };
  imageBase64?: string;
}

const rootOrigin = process.env.EXPO_PUBLIC_LOCAL_DEV_IP;

const ProfileScreen: React.FC = () => {

  const { token, user, username } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [postText, setPostText] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [posting, setPosting] = useState<boolean>(false);
  const [userData, setUserdata] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleUploadIconPress = async () => {
    console.log('handleUploadIconPress: User clicked upload icon');
    Alert.alert(
      'Select Option',
      'Choose an image source',
      [
        {
          text: 'Take Picture',
          onPress: async () => {
            console.log('Taking picture...');
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) {
              console.log('Image captured: ', result.assets[0].uri);
              setSelectedImage(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Upload from Device',
          onPress: async () => {
            console.log('Uploading image from device...');
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) {
              console.log('Image selected: ', result.assets[0].uri);
              setSelectedImage(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const postToBackend = async () => {
    if (!postText.trim()) {
      Alert.alert('Error', "Post text can't be empty");
      console.log("Post text can't be empty");
      return;
    }

    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image');
      console.log('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('text', postText);
    formData.append('image', {
      uri: selectedImage,
      name: 'post-image.jpg',
      type: 'image/jpeg',
    } as any);
    formData.append('userId', user);
    formData.append('username', username)

    try {
      console.log('Sending post request to backend...');
      setPosting(true);
      const response = await fetch(`${rootOrigin}/api/post/uploadpost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to post data to the server');
      }

      const data = await response.json();
      console.log('Post created successfully: ', data);
      Alert.alert('Success', 'Post created successfully');
      setPostText('');
      setSelectedImage(null);
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error posting data:', error);
      Alert.alert('Error', 'Failed to post data. Please try again later.');
    } finally {
      setPosting(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${rootOrigin}/api/auth/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        console.log('User data:', data);
        setUserdata(data.userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Optionally, set error state here to display it to the user
      }
    };

    fetchUserData();
  }, [token]); // Add token as a dependency if it might change

  const fetchPosts = async () => {
    console.log('Fetching posts...');
    try {
      const response = await fetch(`${rootOrigin}/api/post/getposts/user/${user}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 404) {
        // Handle the case where there are no posts (404 error)
        setError('No posts done yet');
        setPosts([]); // Clear any previous posts
        return; // Exit the function early
      }
  
      if (!response.ok) {
        throw new Error('Failed to fetch your posts');
      }
  
      const data = await response.json();
      console.log('Server Response: ', data);
  
      const formattedPosts = data.posts.map((post: Post) => {
        const imageBase64 = `data:${post.image.contentType};base64,${btoa(
          String.fromCharCode(...new Uint8Array(post.image.data.data))
        )}`;
        return {
          ...post,
          imageBase64,
        };
      });
  
      setPosts(formattedPosts);
      setError(''); // Clear any previous error message
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(`Error fetching posts: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, [user, token]);
  

  if (loading) {
    console.log('Loading posts...');
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollableScreen>
      <View style={styles.container}>
        <View style={styles.box_1}>
          <View style={styles.header}>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
            <Text style={styles.logo}>Entrepreneurs Club</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="settings" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box_2}>
          <View style={styles.userContainer}>
            <View style={styles.profileSection}>
              <Image source={require('../../assets/images/icon.png')} style={styles.profileImage} />
              <Text style={styles.username}>{username}</Text>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoText}>User ID:</Text>
                <Text>{userData._id}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoText}>User Name:</Text>
                <Text>{userData.username}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoText}>Email Address:</Text>
                <Text>{userData.email}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoText}>Phone Number:</Text>
                <Text>{userData.phone}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoText}>Occupation:</Text>
                <Text>{userData.occupation}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoText}>My Supply:</Text>
                <Text>{userData.supply}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoText}>About Me:</Text>
                <Text>{userData.description}</Text>
              </View>
            </View>
          </View>
          <View style={styles.posts}>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Posts</Text>
            <View style={styles.userInput}>
            <TextInput
              style={styles.textInput}
              placeholder="What's on your mind?"
              placeholderTextColor="#384959"
              value={postText}
              onChangeText={setPostText}
            />
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadIconPress}>
              <Entypo name="upload" size={24} color="black" />
            </TouchableOpacity>
            </View>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            )}
           

            <Button title="Post" backgroundColor="#3333cc" onPress={postToBackend} />
            {posting && <ActivityIndicator size="large" color="#3333cc" />}
          </View>
        </View>
        <View style={styles.box_3}>
          <Text style={styles.postsHeader}>Your Posts</Text>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                profileImage={require('../../assets/images/image2.png')}
                username={post.username}
                postImage={post.imageBase64}
                caption={post.text}
              />
            ))
          )}
        </View>
      </View>
    </ScrollableScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box_1: {
    flex: 0.2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    backgroundColor: '#6a89a7',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  posts: {
    padding: 15,
    borderRadius: 10,
    backgroundColor:'#88c0f7',
  },
 
  userInput:{
    borderRadius:10,
    marginVertical:10,
    backgroundColor:'#bdddfc',
    flexDirection: 'row', // Aligns items horizontally
  alignItems: 'center', // Vertically aligns items in the center
  justifyContent: 'space-between', // Optional, if you want some space between the input and button
  width: '100%', // Ensures the container takes full width

  },
  textInput: {
    flex: 1, // Makes the TextInput take up available space
    height: 40,
    borderRadius: 5,
    marginRight: 10, // Optional, adds space between the input and button
    paddingLeft: 10,
  },
  
  uploadButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center', // Centers the button text
  },
  previewImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  box_2: {
    alignSelf: 'stretch',
    flex: 1,
  },
  userContainer: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  
  profileSection: {
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 15,
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  
  infoContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    flex: 1,
  },
  
  infoItem: {
    marginBottom: 10,
  },
  
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  
  box_3: {
    flex: 1,
    padding: 15,
  },
  postsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#fdecea', // Light red background for error visibility
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: '#d32f2f', // Red text for the error
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ProfileScreen;
