import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { strings } from '../constants/strings';

function ActionButton({ label, onPress, variant = 'secondary' }) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isPrimary ? styles.primaryButtonText : styles.secondaryButtonText]}>{label}</Text>
    </Pressable>
  );
}

export default function ActionBar({ onCreateFolder, onCreateFile, onRefresh, onOpenStats }) {
  return (
    <View style={styles.container}>
      <ActionButton label={strings.actions.createFolder} onPress={onCreateFolder} variant="primary" />
      <ActionButton label={strings.actions.createTextFile} onPress={onCreateFile} />
      <ActionButton label={strings.actions.refresh} onPress={onRefresh} />
      <ActionButton label={strings.actions.stats} onPress={onOpenStats} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  primaryButtonText: {
    color: colors.surface,
  },
  secondaryButtonText: {
    color: colors.text,
  },
});
