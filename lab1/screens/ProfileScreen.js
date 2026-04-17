import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProfileScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} activeTab="Profile" />

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.screenTitle}>Реєстрація</Text>

                    <Text style={styles.inputLabel}>Електронна пошта</Text>
                    <TextInput style={styles.input} />

                    <Text style={styles.inputLabel}>Пароль</Text>
                    <TextInput style={styles.input} secureTextEntry={true} />

                    <Text style={styles.inputLabel}>Пароль (ще раз)</Text>
                    <TextInput style={styles.input} secureTextEntry={true} />

                    <Text style={styles.inputLabel}>Прізвище</Text>
                    <TextInput style={styles.input} />

                    <Text style={styles.inputLabel}>Ім'я</Text>
                    <TextInput style={styles.input} />

                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Зареєструватися</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <Footer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { flex: 1, paddingHorizontal: 15 },
    screenTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
    inputLabel: { fontSize: 14, color: '#333', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 15, fontSize: 16 },
    submitButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 6, alignItems: 'center', marginTop: 10, marginBottom: 30 },
    submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});