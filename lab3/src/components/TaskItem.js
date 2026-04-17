import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TaskItem({ task, theme }) {
  const completed = task.completed;

  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: completed ? theme.colors.accentSoft : theme.colors.surface,
          borderColor: completed ? theme.colors.accent : theme.colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.icon,
          {
            backgroundColor: completed ? theme.colors.accent : theme.colors.surfaceAlt,
            borderColor: completed ? theme.colors.accent : theme.colors.border,
          },
        ]}
      >
        <Text style={styles.iconText}>{completed ? 'OK' : '...'}</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{task.title}</Text>
        <Text style={[styles.description, { color: theme.colors.textMuted }]}>{task.description}</Text>
      </View>

      <Text style={[styles.status, { color: completed ? theme.colors.success : theme.colors.danger }]}>
        {completed ? 'completed' : 'not completed'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '900',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  status: {
    maxWidth: 84,
    textAlign: 'right',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
