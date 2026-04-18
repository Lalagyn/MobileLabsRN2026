import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import AuthInput from '../../components/AuthInput';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { validateEmail } from '../../utils/validation';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      Alert.alert(STRINGS.errorTitle, 'Введіть коректну email-адресу.');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(normalizedEmail);
      Alert.alert(
        STRINGS.successTitle,
        'Лист для скидання пароля надіслано. Перевірте вашу пошту.',
      );
      setEmail('');
    } catch (error) {
      Alert.alert(STRINGS.errorTitle, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.content}>
      <Text style={styles.title}>Відновлення пароля</Text>
      <Text style={styles.subtitle}>
        Вкажіть email, прив&apos;язаний до акаунта, і Firebase надішле лист для зміни пароля.
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
        <PrimaryButton title="Надіслати лист" onPress={handleReset} loading={loading} />
      </View>

      <Link href="/(auth)/login" style={styles.backLink}>
        Повернутися до входу
      </Link>
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
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  form: {
    marginTop: 28,
  },
  backLink: {
    alignSelf: 'center',
    marginTop: 28,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
