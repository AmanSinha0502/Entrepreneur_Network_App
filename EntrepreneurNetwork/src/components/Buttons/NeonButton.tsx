// src/components/NeonButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface NeonButtonProps {
  title: string;
  onPress: () => void;
  gradientColors?: string[]; // Optional: allows for gradient color customization
}

const NeonButton: React.FC<NeonButtonProps> = ({ title, onPress, gradientColors = ['#384959', '#384959'] }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <LinearGradient colors={gradientColors} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderTopRightRadius:150,
    borderBottomRightRadius:150,
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15,
    marginLeft:30,
    marginRight:30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#00ffcc', // Neon effect shadow color
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // White text for contrast
    textShadowColor: '#000', // Adding a slight black shadow for depth
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default NeonButton;
