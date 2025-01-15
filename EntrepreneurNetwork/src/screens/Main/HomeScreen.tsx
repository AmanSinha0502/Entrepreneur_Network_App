import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import StoryCard from "../../components/Cards/StoryCard";
import PostCard from "../../components/Cards/PostCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigator/RootStackParamList";
import { useAuth } from "../../context/AuthContext";

const rootOrigin = process.env.EXPO_PUBLIC_LOCAL_DEV_IP;

interface Post {
  _id: string;
  text: string;
  image: {
    contentType: string;
    data: { data: number[] };
  };
  imageBase64?: string;
}

const HomeScreen: React.FC = () => {
  const { token, username } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const stories = [
    { id: 1, profileImage: require("../../assets/images/icon.png"), username: "john_doe" },
    { id: 2, profileImage: require("../../assets/images/icon.png"), username: "jane_smith" },
    { id: 3, profileImage: require("../../assets/images/icon.png"), username: "alex_brown" },
  ];

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching posts...");
      const response = await fetch(`${rootOrigin}/api/post/getposts/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response Status:", response.status);
      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (response.status === 401) {
        console.log("Unauthorized. Exiting fetchPosts.");
        return; // Exit early for 401 Unauthorized
      }

      if (response.status === 404) {
        console.log("No posts found.");
        setPosts([]); // Set an empty list to indicate no posts
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to fetch posts. Server responded with status: ${response.status}`
        );
      }

      const data = JSON.parse(responseText);

      if (!data.posts || !Array.isArray(data.posts)) {
        throw new Error("Invalid data structure received from the server.");
      }

      const formattedPosts = data.posts.map((post: Post) => {
        const imageBase64 = `data:${post.image.contentType};base64,${btoa(
          String.fromCharCode(...new Uint8Array(post.image.data.data))
        )}`;
        return { ...post, imageBase64 };
      });

      setPosts(formattedPosts);
      console.log("Posts successfully fetched and formatted.");
    } catch (err: any) {
      console.error("Error fetching posts:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  return (
    <ScrollView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <MaterialIcons name="account-circle" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.logo}>Entrepreneurs Club</Text>
        <View style={styles.iconContainer}></View>
      </View>

      {/* Stories Section */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {stories.map((story) => (
            <StoryCard key={story.id} profileImage={story.profileImage} username={story.username} />
          ))}
        </ScrollView>
      </View>

      {/* Content Section */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading posts...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity onPress={fetchPosts} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : posts.length === 0 ? (
        <View style={styles.noPostsContainer}>
          <Text style={styles.noPostsText}>No posts available.</Text>
        </View>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            profileImage={require("../../assets/images/image2.png")}
            username={username}
            postImage={post.imageBase64}
            caption={post.text}
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bdddfc",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    backgroundColor: "#6a89a7",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  iconContainer: {
    flexDirection: "row",
  },
  storiesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
    backgroundColor: "#6a89a7",
    borderRadius: 5,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
  },
  noPostsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noPostsText: {
    fontSize: 18,
    color: "#555",
  },
});

export default HomeScreen;
