import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import ScrollableScreen from '../../components/Common/ScrollableScreen';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import PostCard from '../../components/Cards/PostCard';
import Button from '../../components/Buttons/Button';

const ProfileScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const posts = [
    {
      id: 1,
      profileImage: require('../../assets/images/image2.png'),
      username: 'john_doe',
      postImage: require('../../assets/images/image1.png'),
      caption: 'This is a beautiful day! The idea of creating this business is based on the requirements of the people and their needs.',
    },
    {
      id: 2,
      profileImage: 'https://via.placeholder.com/40',
      username: 'john_doe',
      postImage: require('../../assets/images/image1.png'),
      caption: 'This is a beautiful day! The idea of creating this business is based on the requirements of the people and their needs.',
    },
  ];

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleUploadIconPress = async () => {
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


  return (
    <ScrollableScreen>
      <View style={styles.container}>
        <View style={styles.box_1}>
          <View style={styles.header}>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
            <Text style={styles.logo}>Entrepreneurs Club</Text>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Ionicons name="settings" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.box_2}>
          <View>
            <View style={styles.userContainer}>
              <Image source={require('../../assets/images/icon.png')} style={styles.profileImage} />
              <Text style={styles.username}> Jacob</Text>
            </View>
            <Text style={styles.title}>Details</Text>
            <View style={styles.details}>
              <Text style={styles.detailsText}>Company Name: Entrepreneurs Network</Text>
              <Text style={styles.detailsText}>Work as CEO</Text>
              <Text style={styles.detailsText}>Lives at: Bangalore, India</Text>
            </View>
          </View>
          <View style={styles.posts}>
            <View>
              <Text style={styles.headerText}>Posts</Text>
            </View>
            <View style={styles.postContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="What's on your mind?"
                placeholderTextColor="#384959"
              />
              <TouchableOpacity onPress={handleUploadIconPress}>
                <Entypo name="upload" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {selectedImage && (
              <View style={styles.imagePreview}>
                <Image source={{ uri: selectedImage }} style={styles.previewImage} />
              </View>
            )}
            <Button style={{ marginTop: 10 }} title="Post" backgroundColor="#3333cc" onPress={() => navigation.navigate('Profile')} />
          </View>
        </View>
        <View style={styles.box_3}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>Your Posts</Text>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              profileImage={post.profileImage}
              username={post.username}
              postImage={post.postImage}
              caption={post.caption}
            />
          ))}
        </View>
      </View>
    </ScrollableScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  box_1: {
    alignSelf: 'stretch',
    flex: 0.2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  userContainer: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  details: {},
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  box_2: {
    alignSelf: 'stretch',
    flex: 1,
  },
  box_3: {
    alignSelf: 'stretch',
    flex: 3,
  },
  posts: {
    backgroundColor: '#88bdf2',
    padding: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bae0f3',
    borderRadius: 8,
    padding: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  imagePreview: {
    marginTop: 10,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default ProfileScreen;
