import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScoreBoard from '../components/ScoreBoard';
import SectionCard from '../components/SectionCard';
import GameArena from '../components/GameArena';
import StatPill from '../components/StatPill';

export default function HomeScreen({ game }) {
  const { theme, score, tasks, completedTasks, lastAction, stats } = game;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: theme.colors.primary }]}>Король Віталій ІПЗ-22-2</Text>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Грай жестами, накопичуй очки, закривай завдання.
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
            Підтримуються tap, double tap, long press, swipe, drag і pinch зі збільшенням бонусу.
          </Text>
        </View>

        <ScoreBoard
          score={score}
          completedTasks={completedTasks}
          totalTasks={tasks.length}
          lastAction={lastAction}
          theme={theme}
        />

        <GameArena game={game} />

        <SectionCard theme={theme}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Живі метрики</Text>
          <View style={styles.statsGrid}>
            <StatPill label="Tap" value={stats.taps} theme={theme} />
            <StatPill label="Double tap" value={stats.doubleTaps} theme={theme} />
            <StatPill label="Long press" value={stats.longPresses} theme={theme} />
            <StatPill label="Swipe" value={stats.swipes} theme={theme} />
            <StatPill label="Drag" value={stats.drags} theme={theme} />
            <StatPill label="Pinch" value={stats.pinches} theme={theme} />
            <StatPill label="Пінч бонус" value={stats.bonusPointsFromPinch} theme={theme} />
            <StatPill label="Рух, px" value={Math.round(stats.totalMoves)} theme={theme} />
          </View>
        </SectionCard>

        <SectionCard theme={theme}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Жести</Text>
          <View style={styles.tips}>
            <Text style={[styles.tipText, { color: theme.colors.textMuted }]}>Tap: +1 очко</Text>
            <Text style={[styles.tipText, { color: theme.colors.textMuted }]}>Double tap: +2 очки</Text>
            <Text style={[styles.tipText, { color: theme.colors.textMuted }]}>Long press: +5 очок</Text>
            <Text style={[styles.tipText, { color: theme.colors.textMuted }]}>
              Swipe left/right: випадковий бонус від 1 до 8
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.textMuted }]}>
              Pinch: масштаб + бонус залежно від сили жесту
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.textMuted }]}>
              Drag: вільне переміщення об'єкта по арені
            </Text>
          </View>
        </SectionCard>
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
    gap: 8,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  sectionTitle: {
    marginBottom: 14,
    fontSize: 18,
    fontWeight: '800',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tips: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
});
