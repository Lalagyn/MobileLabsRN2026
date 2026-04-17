import React, { useState, useCallback } from 'react';
import {
    View, Text, FlatList, Image,
    TouchableOpacity, ActivityIndicator,
    StyleSheet, RefreshControl, Platform, Dimensions
} from 'react-native';
import { newsData } from '../data/mockData';

const BATCH_SIZE = 10;
const windowHeight = Dimensions.get('window').height;

export default function MainScreen({ navigation }) {
    const [data, setData] = useState(newsData.slice(0, BATCH_SIZE));
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setData(newsData.slice(0, BATCH_SIZE));
            setRefreshing(false);
        }, 1500);
    }, []);

    const onEndReached = () => {
        if (loadingMore || data.length >= newsData.length) return;
        setLoadingMore(true);
        setTimeout(() => {
            const next = newsData.slice(0, data.length + BATCH_SIZE);
            setData(next);
            setLoadingMore(false);
        }, 1000);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { item })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardBody}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{
            height: Platform.OS === 'web' ? '100vh' : windowHeight,
            backgroundColor: '#f5f5f5',
            paddingBottom: Platform.OS === 'web' ? 60 : 0
        }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={true}

                ListHeaderComponent={<Text style={styles.header}>Новини</Text>}
                ListFooterComponent={loadingMore ? <ActivityIndicator style={{ padding: 16 }} /> : null}
                ItemSeparatorComponent={() => <View style={styles.separator} />}

                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: { fontSize: 22, fontWeight: 'bold', padding: 16, textAlign: 'center' },
    card: { backgroundColor: '#fff', marginHorizontal: 12, borderRadius: 10, overflow: 'hidden', elevation: 2 },
    image: { width: '100%', height: 160 },
    cardBody: { padding: 12 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    description: { fontSize: 14, color: '#666' },
    separator: { height: 16 },
});