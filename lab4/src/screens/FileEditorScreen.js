import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { readTextFile, updateTextFile } from '../services/fileSystemService';
import { shortenUri } from '../utils/formatters';

export default function FileEditorScreen({ navigation, route }) {
  const { fileUri, fileName } = route.params;
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: fileName,
    });
  }, [fileName, navigation]);

  useEffect(() => {
    const loadFile = async () => {
      try {
        setLoading(true);
        const fileContent = await readTextFile(fileUri);
        setContent(fileContent);
      } catch (error) {
        Alert.alert(strings.editor.openError, error.message || strings.editor.openErrorMessage, [
          { text: strings.editor.ok, onPress: () => navigation.goBack() },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadFile();
  }, [fileUri, navigation]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateTextFile(fileUri, content);
      Alert.alert(strings.editor.savedTitle, strings.editor.savedMessage);
    } catch (error) {
      Alert.alert(strings.editor.saveError, error.message || strings.editor.saveErrorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{strings.editor.loading}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.pathBox}>
          <Text style={styles.label}>{strings.editor.fullPath}</Text>
          <Text style={styles.path}>{shortenUri(fileUri, 100)}</Text>
        </View>

        <Text style={styles.label}>{strings.editor.textContent}</Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          style={styles.editor}
          placeholder={strings.editor.placeholder}
          placeholderTextColor={colors.textSecondary}
        />

        <Pressable style={[styles.saveButton, saving && styles.saveButtonDisabled]} onPress={handleSave} disabled={saving}>
          <Text style={styles.saveButtonText}>{saving ? strings.editor.saving : strings.editor.saveChanges}</Text>
        </Pressable>
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
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 15,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  pathBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 8,
  },
  path: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  editor: {
    minHeight: 340,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700',
  },
});
