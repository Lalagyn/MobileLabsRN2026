import { Directory, Paths } from 'expo-file-system';
import { Platform } from 'react-native';

export const APP_DIRECTORY_NAME = 'file-manager-lab';
export const IS_FILE_SYSTEM_SUPPORTED = Platform.OS !== 'web';
export const APP_ROOT_URI = IS_FILE_SYSTEM_SUPPORTED ? new Directory(Paths.document, APP_DIRECTORY_NAME).uri : null;

export function getAppRootDirectory() {
  if (!IS_FILE_SYSTEM_SUPPORTED) {
    return null;
  }

  return APP_ROOT_URI;
}
