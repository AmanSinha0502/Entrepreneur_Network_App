// src/components/AppWrapper.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

const GlobalStyle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.main}>{children}</View>;
};

const styles = StyleSheet.create({
  main: {
    
    marginTop: 10,
    flex: 1,
    backgroundColor: 'red', // Optional, set a background color if needed
    flexDirection: "column"
  },
});

export default GlobalStyle;
