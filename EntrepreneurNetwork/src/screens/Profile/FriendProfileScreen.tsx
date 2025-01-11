import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import ScrollableScreen from '../../components/Common/ScrollableScreen';
import PostCard from '../../components/Cards/PostCard';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const posts = [
    {
      id: 1,
      profileImage: require('../../assets/images/icon.png'),
      username: 'john_doe',
      postImage:require('../../assets/images/adaptive-icon.png'),
      caption: 'This is a beautiful day! the idea of creating this business is based on the requirements of the people and their needs ',
    },
    {
      id: 2,
      profileImage: require('../../assets/images/icon.png'),
      username: 'john_doe', 
      postImage: require('../../assets/images/adaptive-icon.png'),
      caption: 'This is a beautiful day! the idea of creating this business is based on the requirements of the people and their needs ',
    },
  ]
  const navigation = useNavigation();
  return (
    <ScrollableScreen>
      <View style={styles.container}>
        <View style={styles.box_1}>
          <View style={styles.header}>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
            <Text style={styles.logo}>Entrepreneurs Club</Text>
            <View/>
          </View>
          <View style={styles.userContainer}>
            <Image source={require('../../assets/images/icon.png')} style={styles.profileImage} />
            <Text style={styles.username}> Jacob</Text>
          </View>
        </View>
        <View style={styles.box_2}>
          <Text style={styles.title}>Details</Text>
          <View style={styles.details}>
            <Text style={styles.detailsText}>Company Name: Entrepreneurs Network </Text>
            <Text style={styles.detailsText}>Work as CEO</Text>
            <Text style={styles.detailsText}> Lives at : bangalore India</Text>
          </View>

        </View>
        <View style={styles.box_3}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              profileImage={post.profileImage}
              username={post.username}
              postImage={post.postImage}
              caption={post.caption}
            />
          ))}</View>
      </View>
    </ScrollableScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'orange',
    alignSelf: 'stretch',
    // margin: 10
  },
  box_1: {
    alignSelf: 'stretch',
    // backgroundColor: 'green',
    flex: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    backgroundColor:'#6a89a7'

  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userContainer: {
    paddingTop:15,
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
  details: {

  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  box_2: {
    alignSelf: 'stretch',
    // backgroundColor: 'yellow',
    flex: 1,
  },
  box_3: {
    alignSelf: 'stretch',
    // backgroundColor: 'blue',
    flex: 3,
  },

});

export default HomeScreen;