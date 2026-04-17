import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NEWS_DATA = [
    { id: '1', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
    { id: '2', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
    { id: '3', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
    { id: '4', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },
    { id: '5', title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' },

];

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} activeTab="Home" />

            <View style={styles.content}>
                <Text style={styles.screenTitle}>Новини</Text>
                <FlatList
                    data={NEWS_DATA}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.newsItem}>
                            <View style={styles.newsImagePlaceholder}>
                                <Ionicons name="image-outline" size={30} color="#ccc" />
                            </View>
                            <View style={styles.newsTextContainer}>
                                <Text style={styles.newsTitle}>{item.title}</Text>
                                <Text style={styles.newsDate}>{item.date}</Text>
                                <Text style={styles.newsText}>{item.text}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>

            <Footer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { flex: 1, paddingHorizontal: 15 },
    screenTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
    newsItem: { flexDirection: 'row', marginBottom: 20 },
    newsImagePlaceholder: { width: 70, height: 70, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    newsTextContainer: { flex: 1, justifyContent: 'center' },
    newsTitle: { fontSize: 16, fontWeight: '500', marginBottom: 2 },
    newsDate: { fontSize: 12, color: '#a0a0a0', marginBottom: 4 },
    newsText: { fontSize: 14, color: '#333' }
});