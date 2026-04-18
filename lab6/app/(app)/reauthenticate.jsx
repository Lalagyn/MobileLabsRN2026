import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import AuthInput from '../../components/AuthInput';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { validatePassword } from '../../utils/validation';

export default function ReauthenticateScreen() {
  const { user, deleteAccount } = useAuth();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!validatePassword(password)) {
      Alert.alert(STRINGS.errorTitle, 'Для повторної автентифікації введіть чинний пароль.');
      return;
    }

    try {
      setLoading(true);
      await deleteAccount(password);
      Alert.alert(STRINGS.successTitle, 'Акаунт і документ профілю успішно видалено.');
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert(STRINGS.errorTitle, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Повторна автентифікація</Text>
        <Text style={styles.subtitle}>
          Для безпечного видалення акаунта Firebase вимагає повторно підтвердити пароль для
          <Text style={styles.email}> {user?.email}</Text>.
        </Text>

        <AuthInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          placeholder="Введіть пароль"
          secureTextEntry
        />

        <PrimaryButton
          title="Підтвердити видалення"
          onPress={handleDelete}
          loading={loading}
          variant="danger"
        />
        <View style={styles.spacer} />
        <PrimaryButton
          title="Скасувати"
          onPress={() => router.back()}
          variant="secondary"
          disabled={loading}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 12,
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  email: {
    color: COLORS.text,
    fontWeight: '700',
  },
  spacer: {
    height: 12,
  },
});
