import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import ScrollableScreen from '../../components/Common/ScrollableScreen';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigator/RootStackParamList';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollableScreen>
      <View style={styles.container}>
        <View style={styles.box_1}>
          <View style={styles.header}>
            <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
            <TouchableOpacity onPress={() => navigation.navigate('Message')}></TouchableOpacity>
            <Text style={styles.logo}>Entrepreneurs Club</Text>
            <View/>
          </View>
        </View>
        <View style={styles.box_2}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#bbb" style={styles.icon} />
            <TextInput
              placeholder="Email or Phone Number"
              style={styles.input}
            />
            {/* <Ionicons name="checkmark-circle" size={20} color="green" style={styles.icon} /> */}
          </View>
        </View>
        <View style={[styles.box_3, { margin: 10 }]}>

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
    // backgroundColor: 'black',
    alignSelf: 'stretch',
    // margin: 10
  },
  box_1: {
    alignSelf: 'stretch',
    // backgroundColor: 'green',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    backgroundColor: '#6a89a7', // Optional, to match the gradient's top color
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  box_2: {
    alignSelf: 'stretch',
    // backgroundColor: 'yellow',
    flex: 1,
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
  box_3: {
    alignSelf: 'stretch',
    // backgroundColor: 'blue',
    flex: 3,
  },
});

export default HomeScreen;