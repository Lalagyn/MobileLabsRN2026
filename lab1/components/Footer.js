import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
    return (
        <View style={styles.footer}>

            <Text style={styles.footerText}>Король Віталій Валерійович, ІПЗ-22-2</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    footer: { backgroundColor: '#f5f5f5', padding: 10, borderTopWidth: 1, borderColor: '#ddd', alignItems: 'center' },
    footerText: { fontStyle: 'italic', fontSize: 12, color: '#555' }
});