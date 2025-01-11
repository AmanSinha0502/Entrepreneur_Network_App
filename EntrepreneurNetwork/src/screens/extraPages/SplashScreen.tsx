// src/screens/SplashScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreenComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrepreneur Network</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00695c',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreenComponent;
