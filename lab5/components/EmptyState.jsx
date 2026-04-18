import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function EmptyState({ title, description }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
