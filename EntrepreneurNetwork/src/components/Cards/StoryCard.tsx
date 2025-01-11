import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigator/RootStackParamList';

interface StoryCardProps {
  profileImage: any;
  username: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ profileImage, username }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.storyContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('FriendProfile')} >
        <Image source={profileImage } style={styles.storyImage} />
        <Text style={styles.storyText} numberOfLines={1}>{username}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 8,

  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#888',
    marginBottom: 5,
  },
  storyText: {
    fontSize: 12,
    textAlign: 'center',
    width: 70,
  },
});

export default StoryCard;
