import { useCallback, useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import ProfileField from '../../components/ProfileField';
import ConfirmButton from '../../components/ConfirmButton';
import { useAuth } from '../../context/AuthContext';
import { ensureUserProfileDocument, getUserProfile, saveUserProfile } from '../../services/userService';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { validateProfile } from '../../utils/validation';

const initialForm = {
  name: '',
  age: '',
  city: '',
};

export default function ProfileScreen() {
  const { user, logout, loading: authLoading } = useAuth();
  const userUid = user?.uid ?? null;
  const userEmail = user?.email ?? '';
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadProfile = useCallback(async () => {
    console.log('loadProfile user:', user);

    if (!userUid) {
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      await ensureUserProfileDocument(userUid, userEmail);
      const profile = await getUserProfile(userUid);

      if (profile) {
        setForm({
          name: profile.name ?? '',
          age: profile.age ? String(profile.age) : '',
          city: profile.city ?? '',
        });
      } else {
        setForm(initialForm);
      }
    } catch (error) {
      Alert.alert(STRINGS.errorTitle, error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user, userEmail, userUid]);

  useEffect(() => {
    console.log('Profile useEffect auth/user:', { authLoading, user });

    if (authLoading) {
      return;
    }

    if (!user) {
      setLoading(false);
      setRefreshing(false);
      return;
    }

    loadProfile();
  }, [authLoading, loadProfile, user]);

  const updateField = (key, value) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    const validationError = validateProfile(form);

    if (validationError) {
      Alert.alert(STRINGS.errorTitle, validationError);
      return;
    }

    try {
      setSaving(true);
      await saveUserProfile(user.uid, {
        name: form.name.trim(),
        age: Number(form.age),
        city: form.city.trim(),
        email: user.email ?? '',
      });
      Alert.alert(STRINGS.successTitle, 'Профіль успішно збережено у Firestore.');
    } catch (error) {
      Alert.alert(STRINGS.errorTitle, error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert(STRINGS.errorTitle, error.message);
    } finally {
      setLoggingOut(false);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Підтвердження',
      'Видалення акаунта незворотне. Потрібно повторно ввести пароль для підтвердження.',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Продовжити',
          style: 'destructive',
          onPress: () => router.push('/(app)/reauthenticate'),
        },
      ],
    );
  };

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.loadingCard}>
          <Text style={styles.loadingTitle}>Завантаження профілю...</Text>
          <Text style={styles.loadingSubtitle}>
            Отримуємо ваш документ `users/{'{uid}'}` з Firestore.
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadProfile();
            }}
            tintColor={COLORS.primary}
          />
        }
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Захищений екран</Text>
          <Text style={styles.title}>Профіль користувача</Text>
          <Text style={styles.subtitle}>
            Ви авторизовані як <Text style={styles.email}>{user?.email}</Text>
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Персональні дані</Text>
          <Text style={styles.cardSubtitle}>
            Дані зберігаються лише у вашому документі `users/{user?.uid}`.
          </Text>

          <ProfileField
            label="Ім&apos;я"
            value={form.name}
            onChangeText={(value) => updateField('name', value)}
            placeholder="Введіть ім'я"
          />
          <ProfileField
            label="Вік"
            value={form.age}
            onChangeText={(value) => updateField('age', value)}
            placeholder="Наприклад, 21"
            keyboardType="number-pad"
          />
          <ProfileField
            label="Місто"
            value={form.city}
            onChangeText={(value) => updateField('city', value)}
            placeholder="Введіть місто"
          />

          <PrimaryButton title="Зберегти профіль" onPress={handleSave} loading={saving} />
        </View>

        <View style={styles.actionsRow}>
          <PrimaryButton
            title="Вийти"
            onPress={handleLogout}
            loading={loggingOut}
            variant="secondary"
          />
          <ConfirmButton title="Видалити акаунт" onPress={confirmDelete} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginBottom: 22,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.primarySoft,
    color: COLORS.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 12,
  },
  title: {
    marginTop: 18,
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  email: {
    fontWeight: '700',
    color: COLORS.text,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  cardSubtitle: {
    marginTop: 8,
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  actionsRow: {
    marginTop: 18,
    marginBottom: 32,
    gap: 12,
  },
  loadingCard: {
    marginTop: 120,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  loadingSubtitle: {
    marginTop: 10,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});
