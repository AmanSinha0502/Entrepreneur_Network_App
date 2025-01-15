import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { RootStackParamList } from '../../navigator/RootStackParamList';

const rootOrigin = process.env.EXPO_PUBLIC_LOCAL_DEV_IP;

interface User {
  _id: string;
  username: string;
}

const SearchScreen: React.FC = () => {
  const { token } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Function to search usernames
  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetch(`${rootOrigin}/api/user/search`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Failed to search users. Status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.users || []);
    } catch (error: any) {
      console.error('Error searching users:', error.message);
    } finally {
      setIsSearching(false);
    }
  };

  // Render Search Results
  const renderSearchResult = ({ item }: { item: User }) => (
    <TouchableOpacity style={styles.resultItem}>
      <Text style={styles.resultText}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="account-circle" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.logo}>Entrepreneurs Club</Text>
        <View style={styles.iconContainer}></View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor="#aaa"
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
            searchUsers(text);
          }}
        />
      </View>

      {/* Search Results */}
      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={renderSearchResult}
          style={styles.resultList}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bdddfc',
    flex: 1,
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
    color: '#fff',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultList: {
    marginTop: 10,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SearchScreen;
