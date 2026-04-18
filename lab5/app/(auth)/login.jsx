import { useState } from 'react';
import { Link } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthFormInput from '../../components/AuthFormInput';
import colors from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen() {
  const [form, setForm] = useState(initialState);
  const { login } = useAuth();

  const handleChange = (field, value) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    const result = login(form.email, form.password);

    if (!result.success) {
      Alert.alert('Помилка входу', result.message);
      return;
    }

    setForm(initialState);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.badge}>Лабораторна робота №5</Text>
          <Text style={styles.title}>Вхід до каталогу товарів</Text>
          <Text style={styles.subtitle}>
            Увійдіть у застосунок, щоб переглядати товари та переходити на сторінку деталей.
          </Text>
        </View>

        <View style={styles.card}>
          <AuthFormInput
            label="Електронна пошта"
            placeholder="ipz_222@student.ztu.edu.ua"
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthFormInput
            label="Пароль"
            placeholder="Введіть пароль"
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry
          />

          <Pressable style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Увійти</Text>
          </Pressable>

          <Text style={styles.helperText}>
            Тестовий вхід: ipz_222@student.ztu.edu.ua / 123456
          </Text>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Ще не маєте акаунта?</Text>
            <Link href="/register" style={styles.link}>
              Зареєструватися
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    color: colors.primary,
    fontWeight: '700',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  helperText: {
    marginTop: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 18,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  link: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
});
