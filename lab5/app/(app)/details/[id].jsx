import { Link, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../constants/colors';
import { products } from '../../../data/products';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.missingContainer}>
          <Text style={styles.missingTitle}>Товар не знайдено</Text>
          <Text style={styles.missingDescription}>
            Перевірте маршрут або поверніться до каталогу, щоб обрати товар зі списку.
          </Text>

          <Link href="/" asChild>
            <Pressable style={styles.backButton}>
              <Text style={styles.backButtonText}>Повернутися до каталогу</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.price}>{product.price} грн</Text>
          </View>

          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <Link href="/" asChild>
            <Pressable style={styles.backButton}>
              <Text style={styles.backButtonText}>Назад до каталогу</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 28,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  category: {
    backgroundColor: colors.primarySoft,
    color: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    fontWeight: '700',
    overflow: 'hidden',
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.accent,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  missingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  missingTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  missingDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
});
