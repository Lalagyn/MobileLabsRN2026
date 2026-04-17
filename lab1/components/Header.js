import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation, activeTab }) {
    return (
        <View>
            <View style={styles.topBar}>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.headerTitle}>FirstMobileApp</Text>
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home" size={24} color={activeTab === 'Home' ? '#007AFF' : '#8e8e93'} />
                    <Text style={[styles.tabText, activeTab === 'Home' && styles.tabTextActive]}>Головна</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Gallery')}>
                    <Ionicons name="image" size={24} color={activeTab === 'Gallery' ? '#007AFF' : '#8e8e93'} />
                    <Text style={[styles.tabText, activeTab === 'Gallery' && styles.tabTextActive]}>Фотогалерея</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person" size={24} color={activeTab === 'Profile' ? '#007AFF' : '#8e8e93'} />
                    <Text style={[styles.tabText, activeTab === 'Profile' && styles.tabTextActive]}>Профіль</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 40, paddingBottom: 15, borderBottomWidth: 1, borderColor: '#eee' },
    logoContainer: { flexDirection: 'row', alignItems: 'center' },
    logoImage: { width: 140, height: 40 },
    headerTitle: { fontSize: 18, fontWeight: '500', color: '#000' },
    tabBar: { flexDirection: 'row', backgroundColor: '#f5f5f5', borderBottomWidth: 1, borderColor: '#ddd' },
    tabItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
    tabText: { fontSize: 12, color: '#8e8e93', marginTop: 4 },
    tabTextActive: { color: '#007AFF' },
});