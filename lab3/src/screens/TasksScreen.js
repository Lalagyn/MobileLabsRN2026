import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionCard from '../components/SectionCard';
import TaskItem from '../components/TaskItem';

export default function TasksScreen({ game }) {
  const { theme, tasks, completedTasks } = game;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Завдання</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
            Прогрес оновлюється в реальному часі після кожного жесту.
          </Text>
        </View>

        <SectionCard theme={theme}>
          <View style={styles.progressRow}>
            <View>
              <Text style={[styles.progressLabel, { color: theme.colors.textMuted }]}>Виконано</Text>
              <Text style={[styles.progressValue, { color: theme.colors.text }]}>
                {completedTasks}/{tasks.length}
              </Text>
            </View>
            <View
              style={[
                styles.progressBadge,
                { backgroundColor: theme.colors.primarySoft, borderColor: theme.colors.border },
              ]}
            >
              <Text style={[styles.progressBadgeText, { color: theme.colors.primary }]}>
                {Math.round((completedTasks / tasks.length) * 100)}%
              </Text>
            </View>
          </View>
        </SectionCard>

        <View style={styles.list}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} theme={theme} />
          ))}
        </View>
      </ScrollView>
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
    paddingBottom: 28,
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
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
  },
  progressValue: {
    marginTop: 4,
    fontSize: 36,
    fontWeight: '900',
  },
  progressBadge: {
    borderWidth: 1,
    borderRadius: 22,
    minWidth: 86,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  progressBadgeText: {
    fontSize: 22,
    fontWeight: '900',
  },
  list: {
    gap: 12,
  },
});
