import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function ProductCard({ product }) {
  return (
    <Link href={`/details/${product.id}`} asChild>
      <Pressable style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.price}>{product.price} грн</Text>
          </View>

          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>

          <View style={styles.actionRow}>
            <Text style={styles.linkText}>Переглянути деталі</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 190,
  },
  content: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  category: {
    backgroundColor: colors.primarySoft,
    color: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.accent,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  actionRow: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  linkText: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 14,
  },
});
