// src/components/BlueButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface BlueButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string; // Optional prop for background color
  style?: ViewStyle;
}

const BlueButton: React.FC<BlueButtonProps> = ({ title, onPress, backgroundColor, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor || '#7793c2' }, style]} // Use prop or default
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30, // Rounded edges
    paddingVertical: 12,
    paddingHorizontal: 60,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15, // Shadow transparency
    shadowRadius: 10, // Shadow spread
    elevation: 8, // For Android shadow
  },
  buttonText: {
    color: '#fff', // White text for contrast
    fontSize: 18, // Font size
    fontWeight: '600', // Semi-bold text
    textAlign: 'center', // Centered text
  },

});

export default BlueButton;
