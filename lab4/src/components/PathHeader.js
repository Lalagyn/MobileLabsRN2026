import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { shortenUri } from '../utils/formatters';

export default function PathHeader({ path, rootPath, canGoUp, onGoUp }) {
  return (
    <View style={styles.container}>
      <View style={styles.pathBlock}>
        <Text style={styles.caption}>{strings.pathHeader.currentPath}</Text>
        <Text style={styles.path}>{shortenUri(path, 100)}</Text>
        <Text style={styles.rootLabel}>
          {strings.pathHeader.workspaceRoot}: {shortenUri(rootPath, 64)}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.upButton, !canGoUp && styles.upButtonDisabled, pressed && canGoUp && styles.upButtonPressed]}
        onPress={onGoUp}
        disabled={!canGoUp}
      >
        <Text style={[styles.upButtonText, !canGoUp && styles.upButtonTextDisabled]}>{strings.actions.up}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
  },
  pathBlock: {
    marginBottom: 14,
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 6,
  },
  path: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  rootLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  upButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  upButtonDisabled: {
    opacity: 0.45,
  },
  upButtonPressed: {
    opacity: 0.85,
  },
  upButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
  upButtonTextDisabled: {
    color: colors.textSecondary,
  },
});
