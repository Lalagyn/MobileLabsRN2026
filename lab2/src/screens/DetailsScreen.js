import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
    const { item } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.body}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>Дата: {item.date}</Text>
                <Text style={styles.desc}>{item.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: 220 },
    body: { padding: 16 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
    date: { fontSize: 13, color: '#888', marginBottom: 12 },
    desc: { fontSize: 16, lineHeight: 24 },
});