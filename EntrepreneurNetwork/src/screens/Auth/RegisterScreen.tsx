import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import GreyButton from '../../components/Buttons/Button';
import Toast from 'react-native-toast-message';

const rootOrigin = process.env.EXPO_PUBLIC_LOCAL_DEV_IP;

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [occupation, setOccupation] = useState('');
    const [supply, setSupply] = useState('');

    const validateForm = () => {
        console.log("Validating form...");
        if (!username || !email || !password || !phone || !description || !occupation || !supply) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'All fields are required.',
            });
            console.log("Validation failed: All fields are required.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Email',
                text2: 'Please provide a valid email address.',
            });
            console.log("Validation failed: Invalid email.");
            return false;
        }
        console.log("Validation passed.");
        return true;
    };

    const handleRegister = async () => {
        console.log("Starting registration process...");
        if (!validateForm()) return;

        const data = {
            username,
            email,
            password,
            phone,
            description,
            occupation,
            supply
        };

        try {
            console.log("Sending registration request...");
            const response = await fetch(`${rootOrigin}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const jsonResponse = await response.json();
            console.log("Received response:", jsonResponse);

            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Registration Successful',
                    text2: 'You can now log in.',
                });
                console.log("Registration successful.");
                setTimeout(() => {
                    console.log("Navigating to Login screen...");
                    navigation.navigate('Login');
                }, 2000);  // 2000ms = 2 seconds delay
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Registration Failed',
                    text2: jsonResponse.message || 'Something went wrong. Please try again.',
                });
                console.log("Registration failed:", jsonResponse.message || 'Something went wrong.');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Request Failed',
                text2: 'Unable to connect to the server.',
            });
            console.error("Request failed:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
                <Text style={styles.header}>Entrepreneurs Network</Text>
            </View>

            <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput style={styles.input} placeholder="Who I am" value={description} onChangeText={setDescription} />
            <TextInput style={styles.input} placeholder="What I do" value={occupation} onChangeText={setOccupation} />
            <TextInput style={styles.input} placeholder="What I can give/supply" value={supply} onChangeText={setSupply} />
            
            <GreyButton title="Register" onPress={handleRegister} />

            <Text style={styles.smalltext}>
                Already have an account?{' '}
                <Text onPress={() => navigation.navigate('Login')} style={styles.link}>Login</Text>
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
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#bdddfc',
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
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
    button: {
        marginTop: 20,
        borderRadius: 8,
    },
    buttonGradient: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    smalltext: {
        textAlign: 'center',
        color: '#000',
        marginTop: 16,
    },
    link: {
        color: '#2d608a',
        textDecorationLine: 'underline',
    },
});

export default RegisterScreen;
