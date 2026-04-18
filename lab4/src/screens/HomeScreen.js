import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActionBar from '../components/ActionBar';
import CustomModal from '../components/CustomModal';
import FileListItem from '../components/FileListItem';
import PathHeader from '../components/PathHeader';
import StatCard from '../components/StatCard';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import {
  createFolder,
  createTextFile,
  deleteItem,
  getRootDirectoryUri,
  getStorageStats,
  initializeAppDirectory,
  listDirectory,
} from '../services/fileSystemService';
import { sanitizeTextFileName, validateItemName } from '../utils/fileHelpers';
import { formatBytes } from '../utils/formatters';

const initialFolderForm = { name: '' };
const initialFileForm = { name: '', content: '' };

export default function HomeScreen({ navigation }) {
  const [rootPath, setRootPath] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const [parentPath, setParentPath] = useState(null);
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [fileModalVisible, setFileModalVisible] = useState(false);
  const [folderForm, setFolderForm] = useState(initialFolderForm);
  const [fileForm, setFileForm] = useState(initialFileForm);

  const loadDirectoryData = useCallback(async (targetUri, options = {}) => {
    const { silent = false } = options;

    try {
      if (!silent) {
        setLoading(true);
      }

      await initializeAppDirectory();
      const rootUri = await getRootDirectoryUri();
      const resolvedUri = targetUri || rootUri;
      const directoryData = await listDirectory(resolvedUri);
      const nextStats = await getStorageStats(resolvedUri);

      setRootPath(rootUri);
      setCurrentPath(directoryData.path);
      setParentPath(directoryData.parentPath);
      setItems(directoryData.items);
      setStats(nextStats);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || strings.home.loadError);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDirectoryData();
  }, [loadDirectoryData]);

  useFocusEffect(
    useCallback(() => {
      if (currentPath) {
        loadDirectoryData(currentPath, { silent: true });
      }
    }, [currentPath, loadDirectoryData])
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadDirectoryData(currentPath, { silent: true });
  }, [currentPath, loadDirectoryData]);

  const closeFolderModal = () => {
    setFolderModalVisible(false);
    setFolderForm(initialFolderForm);
  };

  const closeFileModal = () => {
    setFileModalVisible(false);
    setFileForm(initialFileForm);
  };

  const handleCreateFolder = async () => {
    try {
      const validationError = validateItemName(folderForm.name);

      if (validationError) {
        Alert.alert(strings.home.validationError, validationError);
        return;
      }

      await createFolder(currentPath, folderForm.name.trim());
      closeFolderModal();
      await loadDirectoryData(currentPath, { silent: true });
    } catch (error) {
      Alert.alert(strings.home.createFolderError, error.message || strings.home.createFolderError);
    }
  };

  const handleCreateFile = async () => {
    try {
      const normalizedName = sanitizeTextFileName(fileForm.name);
      const validationError = validateItemName(normalizedName, { requireTxt: true });

      if (validationError) {
        Alert.alert(strings.home.validationError, validationError);
        return;
      }

      await createTextFile(currentPath, normalizedName, fileForm.content);
      closeFileModal();
      await loadDirectoryData(currentPath, { silent: true });
    } catch (error) {
      Alert.alert(strings.home.createFileError, error.message || strings.home.createFileError);
    }
  };

  const handleOpenItem = (item) => {
    if (item.type === 'directory') {
      loadDirectoryData(item.uri);
      return;
    }

    navigation.navigate('FileEditor', {
      fileUri: item.uri,
      fileName: item.name,
    });
  };

  const handleDeleteItem = (item) => {
    Alert.alert(
      strings.home.deleteTitle,
      item.type === 'directory'
        ? strings.home.deleteQuestionFolder.replace('{name}', item.name)
        : strings.home.deleteQuestionFile.replace('{name}', item.name),
      [
        { text: strings.common.cancel, style: 'cancel' },
        {
          text: strings.common.delete,
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteItem(item.uri, item.type);
              await loadDirectoryData(currentPath, { silent: true });
            } catch (error) {
              Alert.alert(strings.home.deleteError, error.message || strings.home.deleteError);
            }
          },
        },
      ]
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>{strings.home.emptyTitle}</Text>
      <Text style={styles.emptyText}>{strings.home.emptyText}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{strings.home.loading}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ListHeaderComponent={
          <View>
            <PathHeader
              path={currentPath}
              rootPath={rootPath}
              canGoUp={Boolean(parentPath)}
              onGoUp={() => parentPath && loadDirectoryData(parentPath)}
            />

            <ActionBar
              onCreateFolder={() => setFolderModalVisible(true)}
              onCreateFile={() => setFileModalVisible(true)}
              onRefresh={handleRefresh}
              onOpenStats={() => navigation.navigate('Stats', { currentPath })}
            />

            {!!stats && (
              <View style={styles.statsGrid}>
                <StatCard label={strings.home.totalSpace} value={formatBytes(stats.totalSpace)} accent={colors.primary} />
                <StatCard label={strings.home.freeSpace} value={formatBytes(stats.freeSpace)} accent={colors.success} />
                <StatCard label={strings.home.usedSpace} value={formatBytes(stats.usedSpace)} accent={colors.warning} />
                <StatCard
                  label={strings.home.currentFolderSize}
                  value={formatBytes(stats.currentDirectorySize)}
                  accent={colors.file}
                />
              </View>
            )}

            {!!errorMessage && (
              <View style={styles.errorCard}>
                <Text style={styles.errorTitle}>{strings.common.error}</Text>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            <Text style={styles.sectionTitle}>{strings.home.sectionTitle}</Text>
          </View>
        }
        ListEmptyComponent={renderEmptyState}
        renderItem={({ item }) => (
          <FileListItem
            item={item}
            onOpen={handleOpenItem}
            onDetails={(selectedItem) =>
              navigation.navigate('ItemDetails', {
                itemUri: selectedItem.uri,
                itemType: selectedItem.type,
              })
            }
            onDelete={handleDeleteItem}
          />
        )}
      />

      <CustomModal
        visible={folderModalVisible}
        title={strings.home.createFolderTitle}
        description={strings.home.createFolderDescription}
        confirmLabel={strings.common.create}
        onClose={closeFolderModal}
        onConfirm={handleCreateFolder}
      >
        <TextInput
          value={folderForm.name}
          onChangeText={(text) => setFolderForm({ name: text })}
          placeholder={strings.home.folderPlaceholder}
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          autoCapitalize="none"
        />
      </CustomModal>

      <CustomModal
        visible={fileModalVisible}
        title={strings.home.createFileTitle}
        description={strings.home.createFileDescription}
        confirmLabel={strings.common.create}
        onClose={closeFileModal}
        onConfirm={handleCreateFile}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            value={fileForm.name}
            onChangeText={(text) => setFileForm((prevState) => ({ ...prevState, name: text }))}
            placeholder={strings.home.filePlaceholder}
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            value={fileForm.content}
            onChangeText={(text) => setFileForm((prevState) => ({ ...prevState, content: text }))}
            placeholder={strings.home.fileContentPlaceholder}
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, styles.textArea]}
            multiline
            textAlignVertical="top"
          />
        </ScrollView>
      </CustomModal>
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
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 15,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 18,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  emptyState: {
    marginTop: 24,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    alignItems: 'center',
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorCard: {
    backgroundColor: colors.dangerMuted,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.danger,
    padding: 16,
    marginBottom: 18,
  },
  errorTitle: {
    color: colors.danger,
    fontWeight: '700',
    marginBottom: 6,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  textArea: {
    minHeight: 140,
  },
});
