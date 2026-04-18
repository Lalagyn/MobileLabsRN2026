import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { getItemDetails } from '../services/fileSystemService';
import { formatBytes, formatDate } from '../utils/formatters';

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export default function ItemDetailsScreen({ route }) {
  const { itemUri, itemType } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const response = await getItemDetails(itemUri, itemType);
        setDetails(response);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error.message || strings.details.loadError);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [itemType, itemUri]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (errorMessage) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>{strings.common.error}</Text>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <DetailRow label={strings.details.name} value={details.name} />
          <DetailRow label={strings.details.type} value={details.typeLabel} />
          <DetailRow label={strings.details.extension} value={details.extension} />
          <DetailRow label={strings.details.size} value={formatBytes(details.size)} />
          <DetailRow label={strings.details.lastModified} value={formatDate(details.lastModified)} />
          <DetailRow label={strings.details.createdAt} value={formatDate(details.createdAt)} />
          <DetailRow label={strings.details.fullPath} value={details.uri} />
          {details.itemsCount !== null ? <DetailRow label={strings.details.nestedItems} value={String(details.itemsCount)} /> : null}
        </View>
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
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },
  detailRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 4,
  },
  detailValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  errorCard: {
    margin: 16,
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
