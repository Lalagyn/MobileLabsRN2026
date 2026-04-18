import { useState } from 'react';
import { Link } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthFormInput from '../../components/AuthFormInput';
import colors from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterScreen() {
  const [form, setForm] = useState(initialState);
  const { register } = useAuth();

  const handleChange = (field, value) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    const result = register(form.email, form.password, form.confirmPassword, form.name);

    if (!result.success) {
      Alert.alert('Помилка реєстрації', result.message);
      return;
    }

    setForm(initialState);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.badge}>Створення акаунта</Text>
          <Text style={styles.title}>Реєстрація нового користувача</Text>
          <Text style={styles.subtitle}>
            Заповніть форму, щоб створити локальний акаунт для лабораторної роботи без бекенду.
          </Text>
        </View>

        <View style={styles.card}>
          <AuthFormInput
            label="Ім’я"
            placeholder="Ваше ім’я"
            value={form.name}
            onChangeText={(value) => handleChange('name', value)}
          />
          <AuthFormInput
            label="Електронна пошта"
            placeholder="name@example.com"
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthFormInput
            label="Пароль"
            placeholder="Мінімум 6 символів"
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry
          />
          <AuthFormInput
            label="Підтвердження пароля"
            placeholder="Повторіть пароль"
            value={form.confirmPassword}
            onChangeText={(value) => handleChange('confirmPassword', value)}
            secureTextEntry
          />

          <Pressable style={styles.primaryButton} onPress={handleRegister}>
            <Text style={styles.primaryButtonText}>Зареєструватися</Text>
          </Pressable>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Вже маєте акаунт?</Text>
            <Link href="/login" style={styles.link}>
              Увійти
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
    backgroundColor: colors.accentSoft,
    color: colors.accent,
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
    backgroundColor: colors.accent,
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
