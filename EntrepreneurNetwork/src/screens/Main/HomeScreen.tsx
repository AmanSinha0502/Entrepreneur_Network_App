
import React from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import StoryCard from '../../components/Cards/StoryCard'
import PostCard from '../../components/Cards/PostCard'
import { TouchableOpacity } from 'react-native-gesture-handler';
// import BottomNavigation from '../components/BottomNavigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

const HomeScreen: React.FC = () => {
  const {token} = useAuth();
  console.log("Access Token:",token);

  const stories = [
    { id: 1, profileImage: require('../../assets/images/icon.png'), username: 'john_doe' },
    { id: 2, profileImage: require('../../assets/images/icon.png'), username: 'jane_smith' },
    { id: 3, profileImage: require('../../assets/images/icon.png'), username: 'alex_brown' },
    { id: 4, profileImage: require('../../assets/images/icon.png'), username: 'john_doe' },
    { id: 5, profileImage: require('../../assets/images/icon.png'), username: 'jane_smith' },
    { id: 6, profileImage: require('../../assets/images/icon.png'), username: 'alex_brown' },

    // Add more stories here
  ];

  const posts = [
    {
      id: 1,
      profileImage: require('../../assets/images/icon.png'),
      username: 'john_doe',
      postImage: require('../../assets/images/adaptive-icon.png'),
      caption: 'This is a beautiful day! the idea of creating this business is based on the requirements of the people and their needs ',
    },
    {
      id: 2,
      profileImage: require('../../assets/images/icon.png'),
      username: 'jane_smith',
      postImage: require('../../assets/images/adaptive-icon.png'),
      caption: 'Exploring the outdoors!',
    },
    {
      id: 3,
      profileImage: require('../../assets/images/icon.png'),
      username: 'jane_smith',
      postImage: require('../../assets/images/adaptive-icon.png'),
      caption: 'Exploring the outdoors!',
    },
    {
      id: 4,
      profileImage: require('../../assets/images/icon.png'),
      username: 'jane_smith',
      postImage: require('../../assets/images/adaptive-icon.png'),
      caption: 'Exploring the outdoors!',
    },
    {
      id: 5,
      profileImage: require('../../assets/images/icon.png'),
      username: 'jane_smith',
      postImage: require('../../assets/images/adaptive-icon.png'),
      caption: 'Exploring the outdoors!',
    },
    {
      id: 6,
      profileImage: require('../../assets/images/icon.png'),
      username: 'jane_smith',
      postImage: require('../../assets/images/adaptive-icon.png'),
      caption: 'Exploring the outdoors!',
    },
  ];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScrollView style={styles.Container}>

      {/* Top Navigation */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}><MaterialIcons name="account-circle" size={24} color="black" /></TouchableOpacity>
        <Text style={styles.logo}>Entrepreneurs Club</Text>
        <View style={styles.iconContainer}>
          {/* <FontAwesome name="heart-o" size={24} color="black" style={styles.icon} /> */}
          <TouchableOpacity onPress={() => navigation.navigate('Message')}><MaterialIcons name="message" size={24} color="black" style={styles.icon} /></TouchableOpacity>
        </View>
      </View>

      {/* Stories Section */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {stories.map((story) => (
            <StoryCard key={story.id} profileImage={story.profileImage} username={story.username} />
          ))}
        </ScrollView>
      </View>

      {/* Posts Section */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          profileImage={post.profileImage}
          username={post.username}
          postImage={post.postImage}
          caption={post.caption}
        />
      ))}
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#bdddfc',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    backgroundColor: '#6a89a7'
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  storiesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  postsContainer: {
    // backgroundColor: 'black'
  }
});

export default HomeScreen;
