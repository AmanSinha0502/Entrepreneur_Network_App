import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScrollableScreen from '../../components/Common/ScrollableScreen'; // Assuming you're using this component
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/RootStackParamList';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [step, setStep] = useState(1); // Track the current step
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = () => {
    if (step === 1 && !emailOrPhone.trim()) {
      alert('Please enter your email or phone number');
    } else {
      setStep(2);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
    } else {
      setStep(3);
    }
  };

  const handleResetPassword = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else if (password.length < 6) {
      alert('Password must be at least 6 characters long');
    } else {
      alert('Your password has been reset successfully!');
      setStep(1);
      setEmailOrPhone('');
      setOtp('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <ScrollableScreen>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.box_1}>
          <View style={styles.header}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.logo}>Forgot Password</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.box_2}>
          {step === 1 && (
            <>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#bbb"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Email or Phone Number"
                  style={styles.input}
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                  keyboardType="email-address"
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 2 && (
            <>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#bbb"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter OTP"
                  style={styles.input}
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
                  maxLength={6}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 3 && (
            <>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#bbb"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter New Password"
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#bbb"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Confirm Password"
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleResetPassword}
              >
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollableScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  box_1: {
    alignSelf: 'stretch',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    backgroundColor: '#6a89a7',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  box_2: {
    alignSelf: 'stretch',
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
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
  button: {
    backgroundColor: '#6a89a7',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
