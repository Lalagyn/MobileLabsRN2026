import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StatPill({ label, value, theme }) {
  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: theme.colors.surfaceAlt,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text style={[styles.value, { color: theme.colors.text }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.colors.textMuted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    minWidth: '47%',
    flexGrow: 1,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  value: {
    fontSize: 20,
    fontWeight: '900',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },
});
