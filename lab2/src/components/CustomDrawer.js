import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.profileContainer}>
                <Text style={styles.userName}>Король Віталій Валерійович</Text>
                <Text style={styles.userGroup}>ІПЗ-22-2</Text>
            </View>

            <View style={styles.menuContainer}>
                <DrawerItemList {...props} />
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Лабораторна робота №2</Text>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginBottom: 10,
        marginTop: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    userGroup: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    menuContainer: {
        flex: 1,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    footerText: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    }
});