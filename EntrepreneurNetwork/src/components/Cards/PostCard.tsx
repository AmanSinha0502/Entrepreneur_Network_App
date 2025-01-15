import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigator/RootStackParamList';

interface PostCardProps {
  profileImage: any;
  username: string;
  postImage: any; // Base64 or URI
  caption: string;
}

const PostCard: React.FC<PostCardProps> = ({ profileImage, username, postImage, caption }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Check if postImage is a valid base64 or URL
  const imageSource = postImage && typeof postImage === 'string' 
    ? { uri: postImage.startsWith('data:image') ? postImage : `data:image/jpeg;base64,${postImage}` }
    : require('../../assets/images/image1.png'); // Replace with a default image if the postImage is not valid

  return (
    <View style={styles.postContainer}>
      {/* User Info Section */}
      {/* <TouchableOpacity onPress={() => navigation.navigate('FriendProfile')}> */}
        <View style={styles.userContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.username}>{username}</Text>
        </View>
      {/* </TouchableOpacity> */}

      {/* Post Image */}
      <Image source={imageSource} style={styles.postImage} />

      {/* Caption */}
      {caption && <Text style={styles.caption}>{caption}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginVertical: 10,
    backgroundColor: '#edf2fb',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // for Android
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    marginVertical: 10,
  },
  caption: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 16,
    backgroundColor:'#6a89a7'
  },
});

export default PostCard;
