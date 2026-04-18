import React, { useCallback, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import StatCard from '../components/StatCard';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { getStorageStats } from '../services/fileSystemService';
import { formatBytes, shortenUri } from '../utils/formatters';

export default function StatsScreen({ route }) {
  const currentPath = route.params?.currentPath;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadStats = useCallback(
    async (silent = false) => {
      try {
        if (!silent) {
          setLoading(true);
        }

        const response = await getStorageStats(currentPath);
        setStats(response);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error.message || strings.stats.loadError);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [currentPath]
  );

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [loadStats])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadStats(true);
            }}
          />
        }
      >
        <Text style={styles.title}>{strings.stats.title}</Text>

        <View style={styles.statsGrid}>
          <StatCard label={strings.stats.totalDeviceSpace} value={formatBytes(stats?.totalSpace)} accent={colors.primary} />
          <StatCard label={strings.stats.availableSpace} value={formatBytes(stats?.freeSpace)} accent={colors.success} />
          <StatCard label={strings.stats.usedSpace} value={formatBytes(stats?.usedSpace)} accent={colors.warning} />
          <StatCard label={strings.stats.currentFolderSize} value={formatBytes(stats?.currentDirectorySize)} accent={colors.file} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{strings.stats.workspaceTitle}</Text>
          <Text style={styles.cardText}>{strings.stats.rootPath}: {shortenUri(stats?.rootPath, 90)}</Text>
          <Text style={styles.cardText}>{strings.stats.currentPath}: {shortenUri(stats?.currentPath, 90)}</Text>
          <Text style={styles.cardText}>{strings.stats.workspaceSize}: {formatBytes(stats?.appRootSize)}</Text>
          <Text style={styles.cardText}>{strings.stats.workspaceFiles}: {stats?.appRootFiles ?? strings.common.notAvailable}</Text>
          <Text style={styles.cardText}>{strings.stats.workspaceFolders}: {stats?.appRootDirectories ?? strings.common.notAvailable}</Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>{strings.stats.expoNoteTitle}</Text>
          <Text style={styles.noteText}>{strings.stats.expoNoteText}</Text>
        </View>

        {!!errorMessage && (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>{strings.common.error}</Text>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },
  cardText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 6,
  },
  noteCard: {
    backgroundColor: colors.primaryMuted,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  noteTitle: {
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 8,
  },
  noteText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  errorCard: {
    backgroundColor: colors.dangerMuted,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.danger,
    padding: 16,
  },
  errorTitle: {
    color: colors.danger,
    fontWeight: '700',
    marginBottom: 8,
  },
  errorText: {
    color: colors.danger,
  },
});
