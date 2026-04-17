import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SectionCard from './SectionCard';
import GestureOrb from './GestureOrb';

export default function GameArena({ game }) {
  const { theme } = game;

  return (
    <SectionCard theme={theme}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Ігрова арена</Text>
      <Text style={[styles.description, { color: theme.colors.textMuted }]}>
        Взаємодій з об'єктом усіма жестами. Drag переміщує сферу, pinch масштабує її, swipe дає випадковий бонус.
      </Text>

      <View
        style={[
          styles.arena,
          {
            backgroundColor: theme.colors.surfaceAlt,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <GestureOrb theme={theme} actions={game.actions} />
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  arena: {
    marginTop: 18,
    height: 340,
    borderRadius: 28,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
