import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import AuthInput from '../../components/AuthInput';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { validateEmail, validatePassword } from '../../utils/validation';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      Alert.alert(STRINGS.errorTitle, 'Введіть коректну email-адресу.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(STRINGS.errorTitle, 'Пароль має містити щонайменше 6 символів.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(STRINGS.errorTitle, 'Підтвердження пароля не збігається.');
      return;
    }

    try {
      setLoading(true);
      await register(normalizedEmail, password);
      Alert.alert(STRINGS.successTitle, 'Акаунт створено. Тепер заповніть профіль.');
      router.replace('/(app)/profile');
    } catch (error) {
      console.log('Register screen error:', error);
      Alert.alert(STRINGS.errorTitle, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.content}>
      <Text style={styles.title}>Реєстрація</Text>

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
          placeholder="Не менше 6 символів"
          secureTextEntry
        />
        <AuthInput
          label="Підтвердження пароля"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Повторіть пароль"
          secureTextEntry
        />

        <PrimaryButton title="Зареєструватися" onPress={handleRegister} loading={loading} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Вже маєте акаунт?</Text>
        <Link href="/(auth)/login" style={styles.footerLink}>
          Увійти
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
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
  },
  form: {
    marginTop: 28,
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
