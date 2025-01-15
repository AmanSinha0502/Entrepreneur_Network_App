// src/screens/Auth/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from '../../components/Buttons/Button';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';

const rootOrigin = process.env.EXPO_PUBLIC_LOCAL_DEV_IP;

const LoginScreen = () => {
  const {storeTokenAndUser} = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Email and Password are required.',
      });
      console.log('Validation failed: Missing fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please provide a valid email address.',
      });
      console.log('Validation failed: Invalid email');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const data = { email, password };
    console.log('Sending login request with data:', data);

    try {
      const response = await fetch(`${rootOrigin}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const jsonResponse = await response.json();
      console.log('Login response:', jsonResponse);

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
        });
        console.log('Login successful');
        await storeTokenAndUser(jsonResponse.token, jsonResponse.userId, jsonResponse.username ); // Update this line
        setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);  // 2000ms = 2 seconds delay
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: jsonResponse.message || 'Invalid credentials. Please try again.',
        });
        console.log('Login failed:', jsonResponse.message);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Request Failed',
        text2: 'Unable to connect to the server.',
      });
      console.error('Request failed:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button title="Login" backgroundColor="#7793c2" onPress={handleLogin} />

      <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
        Forgot your password?
      </Text>

      <Text style={styles.connectText}>or connect with</Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={20} color="#fff" />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-twitter" size={20} color="#fff" />
          <Text style={styles.socialButtonText}>Twitter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text onPress={() => navigation.navigate('Register')} style={styles.signUpLink}>
          Sign up
        </Text>
      </Text>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: '#bdddfc',
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    height: 50,
  },
  forgotPassword: {
    color: '#000',
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  connectText: {
    color: '#000',
    marginVertical: 10,
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  socialButton: {
    backgroundColor: '#384959',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  socialButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  signUpText: {
    color: '#000',
    marginTop: 20,
    textAlign: 'center',
  },
  signUpLink: {
    color: '#2d608a',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
