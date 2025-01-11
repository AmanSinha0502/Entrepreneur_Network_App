// src/screens/IntroScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import NeonButton from '../../components/Buttons/NeonButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have this package installed
import { ScrollView } from 'react-native-gesture-handler';

type IntroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: IntroScreenNavigationProp;
};

const IntroScreen: React.FC<Props> = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1, // Animate to full opacity
            duration: 2000, // 2 seconds
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <Animated.View style={{ ...styles.headerContainer, opacity: fadeAnim }}>
                <Image
                    source={require('../../assets/images/icon.png')}
                    style={styles.image}
                />
                <Text style={styles.title}>Welcome to the Entrepreneur Network App</Text>
            </Animated.View>


            <View style={styles.contentBox}>
                <LinearGradient
                    colors={['#e0f7fa', '#ffffff']} // Gradient colors
                    style={styles.gradientBox} // Style for gradient background
                >
                    <Text style={styles.heading}>About Us</Text>
                    <Text style={styles.content}>
                        The Entrepreneurs Network is a platform that connects entrepreneurs to
                        collaborate, innovate, and grow. We match members based on shared goals, enabling meaningful
                        networking and opportunities for success.
                    </Text>
                </LinearGradient>

                <LinearGradient
                    colors={['#fff3e0', '#ffffff']} // Different gradient for the second box
                    style={styles.gradientBox}
                >
                    <Text style={styles.heading}>What you will get</Text>
                    <Text style={styles.content}>
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
                    </Text>
                </LinearGradient>

            </View>
            {/* <View style={styles.buttonContainer}>
                    <NeonButton title="Intro test" onPress={() => navigation.navigate('IntroSplashScreen1')} />
                </View> */}
            <View style={styles.buttonContainer}>
                <NeonButton title="Get Started >>>" onPress={() => navigation.navigate('Login')} />
            </View>
            <View style={styles.buttonContainer}>
                <NeonButton title="Demo >>>" onPress={() => navigation.navigate('Demo')} />
            </View>
            {/* <View style={styles.buttonContainer}>
                    <NeonButton title="Register" onPress={() => navigation.navigate('Register')} />
                </View> */}
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
        color: '#fff', // White text for contrast
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
    },
    contentBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    gradientBox: {
        width: '100%',             // Full width of the container
        borderRadius: 12,          // Rounded corners
        padding: 20,               // Padding inside the box
        marginBottom: 20,          // Space between boxes
        shadowColor: '#000',       // Shadow effect for Android
        shadowOffset: { width: 0, height: 4 }, // Shadow offset
        shadowOpacity: 0.2,        // Shadow opacity
        shadowRadius: 6,           // Shadow radius
        elevation: 5,              // Elevation for iOS
    },
    heading: {
        fontSize: 24,              // Adjust size for the heading
        fontWeight: 'bold',        // Make it bold
        marginBottom: 10,          // Space below heading
        color: '#00796b',          // Color for the heading
    },
    content: {
        fontSize: 16,              // Adjust size for content
        color: '#333',             // Color for the content
        lineHeight: 40,            // Improved line height for readability
    },
    image: {
        width: 200,
        height: 200,
        margin: 10,
    },
});

export default IntroScreen;