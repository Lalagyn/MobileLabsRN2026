import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';

export default function StatCard({ label, value, accent }) {
  return (
    <View style={styles.card}>
      <View style={[styles.accent, { backgroundColor: accent }]} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: '48%',
    flexGrow: 1,
    minWidth: 140,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  accent: {
    width: 36,
    height: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 6,
  },
  value: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
});
