// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import GreyButton from '../../components/Buttons/Button';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [occupation, setOccupation] = useState('');
    const [supply, setSupply] = useState('');


    const handleRegister = () => {
        console.log({ name, email, password, phone, description, occupation, supply });
    };

    return (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
               <View >
                   <Text style={styles.header}> Entrepreneurs Network</Text>
                </View> 
 
                <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <TextInput style={styles.input} placeholder="Who I am" value={description} onChangeText={setDescription} />
                <TextInput style={styles.input} placeholder="What I do" value={occupation} onChangeText={setOccupation} />
                <TextInput style={styles.input} placeholder="What I can give/supply" value={supply} onChangeText={setSupply} />
                <GreyButton title="Register" onPress={() => navigation.navigate('Login')}/>
                <Text style={styles.smalltext}>
                        Already have an account?{' '}
                        <Text onPress={() => navigation.navigate('Login')} style={styles.link}> Login </Text>
                    </Text>
                    
            </ScrollView>
            
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex:1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor:'#bdddfc',    },
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
