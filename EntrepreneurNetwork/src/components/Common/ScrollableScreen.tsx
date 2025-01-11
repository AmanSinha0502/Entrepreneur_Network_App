// ScrollableScreen.js
import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

interface ScrollableScreenProps {
  children: ReactNode;
}

const ScrollableScreen: React.FC<ScrollableScreenProps> = ({ children }) => {
  return (

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Adjust this offset as needed
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SafeAreaView style={styles.innerBox}>{children}</SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
     backgroundColor:'#bdddfc'
  },
  scrollContainer: {
    // margin: 30,               // Outer margin for scroll container
    // backgroundColor: 'purple',
    flexGrow: 1,
  },
  innerBox: {
    flex: 1,
    // margin: 10,               
    // backgroundColor: 'red', 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScrollableScreen;