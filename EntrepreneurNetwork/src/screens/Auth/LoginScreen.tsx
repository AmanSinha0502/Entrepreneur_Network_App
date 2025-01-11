// src/screens/Auth/LoginScreen.tsx
import React from 'react';
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
import colors from '../../constants/colors';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Button from '../../components/Buttons/Button';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
  
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#bbb" style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
          />
          {/* <Ionicons name="checkmark-circle" size={20} color="green" style={styles.icon} /> */}
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#bbb" style={styles.icon} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
        </View>
        <Button title="Login" backgroundColor="#7793c2" onPress={() => navigation.navigate('Home')}/>

        <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>Forgot your password?</Text>

        <Text style={styles.connectText}>or connect with</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={20} color="#fff" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} >
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
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor:'#bdddfc',
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
    marginTop:15,
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
