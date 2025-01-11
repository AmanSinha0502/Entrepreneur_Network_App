import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            <TouchableOpacity style={styles.option}>
                <Ionicons name="person-circle" size={24} color="white" style={styles.icon} />
                <Text style={styles.optionText}>Blocked Accounts</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <Ionicons name="notifications" size={24} color="white" style={styles.icon} />
                <Text style={styles.optionText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <Ionicons name="shield-checkmark" size={24} color="white" style={styles.icon} />
                <Text style={styles.optionText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <MaterialIcons name="description" size={24} color="white" style={styles.icon} />
                <Text style={styles.optionText}>Terms of Service</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <Ionicons name="book" size={24} color="white" style={styles.icon} />
                <Text style={styles.optionText}>Community Guidelines</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <View style={styles.optionContent}>
                    <Ionicons name="help-circle" size={24} color="white" style={styles.icon} />
                    <Text style={styles.optionText}>Support</Text>
                </View>
                <View>
                    <AntDesign name="right" size={24} color="white" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton}>
                <Ionicons name="log-out" size={24} color="red" style={styles.icon} />
                <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1423',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent:'space-between',
        backgroundColor: '#2C213F',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    optionContent:{
        flexDirection: 'row',
        alignItems: 'baseline',
        backgroundColor: '#2C213F',
    },
    icon: {
        marginRight: 16,
    },
    optionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        padding: 16,
        backgroundColor: '#2C213F',
        borderRadius: 8,
    },
    logoutText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default SettingsScreen;