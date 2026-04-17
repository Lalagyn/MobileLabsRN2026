import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionCard from '../components/SectionCard';

export default function SettingsScreen({ game }) {
  const { theme, actions, score, completedTasks, tasks } = game;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Налаштування</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
            Керуйте темою та скидайте прогрес гри одним натисканням.
          </Text>
        </View>

        <SectionCard theme={theme}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Темна тема</Text>
              <Text style={[styles.cardText, { color: theme.colors.textMuted }]}>
                Перемикає кольорову схему всього застосунку.
              </Text>
            </View>
            <Switch
              value={theme.isDark}
              onValueChange={actions.toggleTheme}
              thumbColor="#ffffff"
              trackColor={{ false: theme.colors.surfaceAlt, true: theme.colors.primary }}
            />
          </View>
        </SectionCard>

        <SectionCard theme={theme}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Поточний прогрес</Text>
          <View style={styles.summary}>
            <View style={[styles.summaryChip, { backgroundColor: theme.colors.surfaceAlt }]}>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{score}</Text>
              <Text style={[styles.summaryLabel, { color: theme.colors.textMuted }]}>Очки</Text>
            </View>
            <View style={[styles.summaryChip, { backgroundColor: theme.colors.surfaceAlt }]}>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                {completedTasks}/{tasks.length}
              </Text>
              <Text style={[styles.summaryLabel, { color: theme.colors.textMuted }]}>Завдання</Text>
            </View>
          </View>

          <Pressable
            onPress={actions.resetProgress}
            style={({ pressed }) => [
              styles.resetButton,
              {
                backgroundColor: pressed ? theme.colors.danger : theme.colors.primary,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={styles.resetButtonText}>Скинути прогрес</Text>
          </Pressable>
        </SectionCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 18,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  rowContent: {
    flex: 1,
    gap: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  summary: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
    marginBottom: 18,
  },
  summaryChip: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '900',
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
  },
  resetButton: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
