// src/navigations/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header, TransitionPresets } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';
import IntroScreen from '../screens/extraPages/IntroScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import MessageScreen from '../screens/Main/MessageScreen';
import ChatScreen from '../screens/Main/ChatScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import FriendProfileScreen from '../screens/Profile/FriendProfileScreen';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import Demo from '../screens/extraPages/demo';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer >
    <SafeAreaView style={{flex:1}}>
    <Stack.Navigator screenOptions={{
         headerShown: false,
       }}
    >
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Message" component={MessageScreen}/>
      <Stack.Screen name="Chat" component={ChatScreen}/>
      <Stack.Screen name="FriendProfile" component={FriendProfileScreen}/>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="Settings" component={SettingsScreen}/>
      <Stack.Screen name="Demo" component={Demo}/>

    </Stack.Navigator>
    </SafeAreaView>
  </NavigationContainer>
);

export default AppNavigator;
