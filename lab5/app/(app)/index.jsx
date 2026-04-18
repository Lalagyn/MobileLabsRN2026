import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import ProductCard from '../../components/ProductCard';
import colors from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';

export default function CatalogScreen() {
  const { logout, currentUser } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTextBlock}>
            <Text style={styles.greeting}>
              Вітаємо{currentUser?.name ? `, ${currentUser.name}` : ''}!
            </Text>
            <Text style={styles.title}>Каталог товарів</Text>
            <Text style={styles.subtitle}>
              Оберіть товар зі списку та відкрийте сторінку з детальною інформацією.
            </Text>
          </View>

          <Pressable style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Вийти</Text>
          </Pressable>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              title="Товарів поки немає"
              description="Додайте дані в масив products, щоб список заповнився."
            />
          }
        />
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
    paddingTop: 8,
  },
  header: {
    marginBottom: 16,
  },
  headerTextBlock: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  logoutButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.dangerSoft,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  logoutButtonText: {
    color: colors.danger,
    fontWeight: '700',
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 24,
    gap: 16,
  },
});
