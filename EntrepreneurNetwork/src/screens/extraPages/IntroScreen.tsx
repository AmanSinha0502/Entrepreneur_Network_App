import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import NeonButton from '../../components/Buttons/NeonButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { ScrollView } from 'react-native-gesture-handler';

type IntroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: IntroScreenNavigationProp;
};

const IntroScreen: React.FC<Props> = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [loading, setLoading] = useState(true); // Loading state to show the loading button

    useEffect(() => {
        // Start the fade-in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        // Check for the first-time app launch
        const checkAppLaunch = async () => {
            try {
                const firstLaunch = await AsyncStorage.getItem('isFirstTime');
                console.log("Is first Time:", firstLaunch);
                if (firstLaunch === null) {
                    // First time launch, set the flag
                    await AsyncStorage.setItem('isFirstTime', 'false');
                    setLoading(false); // Set loading false after logic check
                    console.log('First time launch. Doing nothing...');
                } else {
                    // Not the first time launch, check the token
                    const storedToken = await AsyncStorage.getItem('token');
                    setLoading(false); // Set loading false after token check
                    if (storedToken) {
                        // Token exists, navigate to Home screen
                        console.log('Token found. Redirecting to Home...');
                        navigation.navigate('Home');
                    } else {
                        // No token, navigate to Login screen
                        console.log('No token found. Redirecting to Login...');
                        navigation.navigate('Login');
                    }
                }
            } catch (error) {
                console.error('Error checking app launch or token:', error);
                setLoading(false); // Stop loading in case of error
            }
        };

        checkAppLaunch();
    }, [navigation, fadeAnim]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {loading ? (
                <View style={styles.buttonContainer}>
                    <NeonButton title="Loading..." onPress={() => { }} />
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <Animated.View style={{ ...styles.headerContainer, opacity: fadeAnim }}>
                    <View style={styles.contentBox}>
                <LinearGradient colors={['#e0f7fa', '#ffffff']} style={styles.gradientBox}>
                    <Text style={styles.heading}>About Us</Text>
                    <Text style={styles.content}>
                        The Entrepreneurs Network is a platform that connects entrepreneurs to collaborate, innovate, and grow. We match members based on shared goals, enabling meaningful networking and opportunities for success.
                    </Text>
                </LinearGradient>

                <LinearGradient colors={['#fff3e0', '#ffffff']} style={styles.gradientBox}>
                    <Text style={styles.heading}>What you will get</Text>
                    <View style={styles.point}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.text}>Tailored connections with like-minded entrepreneurs.</Text>
                    </View>
                    <View style={styles.point}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.text}>Access to resources, workshops, and forums.</Text>
                    </View>
                    <View style={styles.point}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.text}>Opportunities to showcase your business and expand your network.</Text>
                    </View>
                    <View style={styles.point}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.text}>24/7 access to connect, learn, and grow.</Text>
                    </View>
                    <Text style={styles.footer}>Join us to unlock your entrepreneurial potential!</Text>
                </LinearGradient>

                <View style={styles.buttonContainer}>
                    <NeonButton title="Get Started >>>" onPress={() => navigation.navigate('Login')} />
                </View>
            </View>
                </Animated.View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#bdddfc',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
        padding: 10,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 15,
    },
    text: {
        color: '#000',
    },
    point: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    bullet: {
        fontSize: 18,
        marginRight: 10,
        color: '#555',
    },
    footer: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    contentBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    gradientBox: {
        width: '100%',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#00796b',
    },
    content: {
        fontSize: 16,
        color: '#333',
        lineHeight: 40,
    },
    image: {
        width: 200,
        height: 200,
        margin: 10,
    },
});

export default IntroScreen;
