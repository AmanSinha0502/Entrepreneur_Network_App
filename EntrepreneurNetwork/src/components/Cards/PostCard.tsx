import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigator/RootStackParamList';

interface PostCardProps {
  profileImage: any;
  username: string;
  postImage: any;
  caption: string;
}
const PostCard: React.FC<PostCardProps> = ({ profileImage, username, postImage, caption }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.postContainer}>
      {/* User Info Section */}
      <TouchableOpacity onPress={() => navigation.navigate('FriendProfile')}>
        <View style={styles.userContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.username}>{username}</Text>
        </View>
      </TouchableOpacity>

      {/* Post Image */}
      <Image source={postImage} style={styles.postImage} />

      {/* Caption */}
      {caption && <Text style={styles.caption}>{caption}</Text>}
    </View>
  );
};


const styles = StyleSheet.create({
  postContainer: {
    marginVertical: 10,
    backgroundColor:'#edf2fb',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    },
  caption: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
  },
});

export default PostCard;
