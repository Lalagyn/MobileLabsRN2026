import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GALLERY_DATA = Array.from({ length: 10 }, (_, i) => ({ id: String(i) }));

export default function GalleryScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} activeTab="Gallery" />

            <View style={styles.content}>
                <FlatList
                    data={GALLERY_DATA}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.galleryRow}
                    showsVerticalScrollIndicator={false}
                    renderItem={() => (
                        <View style={styles.galleryBox}></View>
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
    galleryRow: { justifyContent: 'space-between', marginTop: 15 },
    galleryBox: { width: '48%', aspectRatio: 1.5, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 4 }
});