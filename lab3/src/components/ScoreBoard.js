import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SectionCard from './SectionCard';

export default function ScoreBoard({ score, completedTasks, totalTasks, lastAction, theme }) {
  return (
    <SectionCard theme={theme} style={styles.wrapper}>
      <View style={styles.row}>
        <View>
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Поточний рахунок</Text>
          <Text style={[styles.score, { color: theme.colors.text }]}>{score}</Text>
        </View>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: theme.colors.primarySoft,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.badgeValue, { color: theme.colors.primary }]}>
            {completedTasks}/{totalTasks}
          </Text>
          <Text style={[styles.badgeLabel, { color: theme.colors.textMuted }]}>завдань</Text>
        </View>
      </View>
      <Text style={[styles.lastActionLabel, { color: theme.colors.textMuted }]}>Остання дія</Text>
      <Text style={[styles.lastAction, { color: theme.colors.text }]}>{lastAction}</Text>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  score: {
    marginTop: 4,
    fontSize: 46,
    fontWeight: '900',
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 90,
  },
  badgeValue: {
    fontSize: 22,
    fontWeight: '900',
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  lastActionLabel: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  lastAction: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
});
