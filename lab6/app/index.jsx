import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/colors';

export default function IndexPage() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.text}>Перевіряємо статус авторизації...</Text>
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? '/(app)' : '/(auth)/login'} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: 24,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});
