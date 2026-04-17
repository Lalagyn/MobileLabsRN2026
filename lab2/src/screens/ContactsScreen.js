import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { contactsData } from '../data/mockData';

export default function ContactsScreen() {
    return (
        <SectionList
            sections={contactsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.phone}>{item.phone}</Text>
                </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
    );
}
const styles = StyleSheet.create({
    sectionHeader: { backgroundColor: '#f0f0f0', padding: 10, fontSize: 16, fontWeight: 'bold' },
    item: { padding: 14, backgroundColor: '#fff' },
    name: { fontSize: 15, fontWeight: '500' },
    phone: { fontSize: 13, color: '#666', marginTop: 2 },
    separator: { height: 1, backgroundColor: '#eee' },
});