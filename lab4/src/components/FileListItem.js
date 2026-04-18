import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { formatBytes, formatDate } from '../utils/formatters';

function ItemBadge({ type }) {
  const isDirectory = type === 'directory';

  return (
    <View style={[styles.badge, isDirectory ? styles.folderBadge : styles.fileBadge]}>
      <Text style={[styles.badgeText, isDirectory ? styles.folderBadgeText : styles.fileBadgeText]}>
        {isDirectory ? strings.fileListItem.directoryBadge : strings.fileListItem.fileBadge}
      </Text>
    </View>
  );
}

export default function FileListItem({ item, onOpen, onDetails, onDelete }) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.mainArea} onPress={() => onOpen(item)}>
        <ItemBadge type={item.type} />
        <View style={styles.meta}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info}>
            {item.type === 'directory' ? strings.fileListItem.directory : strings.fileListItem.file} | {formatBytes(item.size)} | {formatDate(item.modificationTime)}
          </Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={() => onDetails(item)}>
          <Text style={styles.actionText}>{strings.common.details}</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={() => onDelete(item)}>
          <Text style={[styles.actionText, styles.deleteText]}>{strings.common.delete}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },
  mainArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  folderBadge: {
    backgroundColor: colors.folderMuted,
  },
  fileBadge: {
    backgroundColor: colors.fileMuted,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '800',
  },
  folderBadgeText: {
    color: colors.folder,
  },
  fileBadgeText: {
    color: colors.file,
  },
  meta: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  info: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: colors.dangerMuted,
  },
  actionText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  deleteText: {
    color: colors.danger,
  },
});
