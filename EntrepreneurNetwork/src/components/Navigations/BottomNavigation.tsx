// src/components/BottomNavigation.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNavigation = () => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="home-outline" size={24} color="#4caf50" />
      <Text style={styles.navText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="search-outline" size={24} color="white" />
      <Text style={styles.navText}>Search</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="library-outline" size={24} color="white" />
      <Text style={styles.navText}>Your Library</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="star-outline" size={24} color="white" />
      <Text style={styles.navText}>Premium</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavigation;



// replace this code when you define the buttons 

// Update BottomNavigation.tsx
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const BottomNavigation = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.bottomNav}>
//       <TouchableOpacity
//         style={styles.navItem}
//         onPress={() => navigation.navigate('Home')}
//       >
//         <Ionicons name="home-outline" size={24} color="#4caf50" />
//         <Text style={styles.navText}>Home</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.navItem}
//         onPress={() => navigation.navigate('Search')}
//       >
//         <Ionicons name="search-outline" size={24} color="white" />
//         <Text style={styles.navText}>Search</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.navItem}
//         onPress={() => navigation.navigate('Library')}
//       >
//         <Ionicons name="library-outline" size={24} color="white" />
//         <Text style={styles.navText}>Your Library</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.navItem}
//         onPress={() => navigation.navigate('Premium')}
//       >
//         <Ionicons name="star-outline" size={24} color="white" />
//         <Text style={styles.navText}>Premium</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
