import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});