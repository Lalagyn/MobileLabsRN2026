import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Сторінку не знайдено', headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.code}>404</Text>
        <Text style={styles.title}>Сторінку не знайдено</Text>
        <Text style={styles.description}>
          Перевірте адресу маршруту або поверніться на головний екран застосунку.
        </Text>
        <Link href="/" style={styles.link}>
          Повернутися на головну
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 24,
  },
  code: {
    fontSize: 56,
    fontWeight: '800',
    color: COLORS.primary,
  },
  title: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  link: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontWeight: '700',
    overflow: 'hidden',
  },
});
