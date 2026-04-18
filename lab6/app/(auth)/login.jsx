import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import AuthInput from '../../components/AuthInput';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { validateEmail, validatePassword } from '../../utils/validation';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      Alert.alert(STRINGS.errorTitle, 'Введіть коректну email-адресу.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(STRINGS.errorTitle, 'Пароль має містити щонайменше 6 символів.');
      return;
    }

    try {
      setLoading(true);
      await login(normalizedEmail, password);
      router.replace('/(app)');
    } catch (error) {
      Alert.alert(STRINGS.errorTitle, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.content}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Лабораторна №6</Text>
      </View>
      <Text style={styles.title}>Вхід до застосунку</Text>
      <Text style={styles.subtitle}>
        Авторизуйтеся, щоб переглядати та редагувати свій профіль у Firestore.
      </Text>

      <View style={styles.form}>
        <AuthInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="example@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <AuthInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          placeholder="Введіть пароль"
          secureTextEntry
        />

        <PrimaryButton title="Увійти" onPress={handleLogin} loading={loading} />

        <Link href="/(auth)/forgot-password" asChild>
          <Pressable style={styles.inlineLink}>
            <Text style={styles.inlineLinkText}>Забули пароль?</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ще немає акаунта?</Text>
        <Link href="/(auth)/register" style={styles.footerLink}>
          Зареєструватися
        </Link>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.primarySoft,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  form: {
    marginTop: 28,
  },
  inlineLink: {
    alignSelf: 'flex-end',
    marginTop: 14,
  },
  inlineLinkText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    color: COLORS.textSecondary,
  },
  footerLink: {
    marginLeft: 6,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
