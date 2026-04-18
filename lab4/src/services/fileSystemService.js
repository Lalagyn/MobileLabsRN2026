import { Directory, File, Paths } from 'expo-file-system';

import { getAppRootDirectory, IS_FILE_SYSTEM_SUPPORTED } from '../constants/paths';
import { strings } from '../constants/strings';
import { isTxtFile, sanitizeTextFileName, validateItemName } from '../utils/fileHelpers';

function assertFileSystemSupport() {
  if (!IS_FILE_SYSTEM_SUPPORTED) {
    throw new Error(strings.service.fileSystemUnsupported);
  }
}

function getRootDirectoryUri() {
  assertFileSystemSupport();
  return getAppRootDirectory();
}

function normalizeDirectoryUri(uri) {
  const nextUri = uri || getRootDirectoryUri();
  return nextUri.endsWith('/') ? nextUri : `${nextUri}/`;
}

function trimDirectoryUri(uri) {
  return uri.endsWith('/') ? uri.slice(0, -1) : uri;
}

function getDirectory(uri) {
  return new Directory(trimDirectoryUri(normalizeDirectoryUri(uri)));
}

function getFile(uri) {
  return new File(trimDirectoryUri(uri));
}

function getPathInfo(uri) {
  return Paths.info(trimDirectoryUri(uri));
}

function getNameFromUri(uri) {
  const normalizedUri = trimDirectoryUri(uri);
  const parts = normalizedUri.split('/');
  return parts[parts.length - 1] || '';
}

function mapDirectoryInfo(directory) {
  const info = directory.info();

  return {
    id: normalizeDirectoryUri(directory.uri),
    name: directory.name || getNameFromUri(directory.uri),
    uri: normalizeDirectoryUri(directory.uri),
    type: 'directory',
    size: info.size ?? 0,
    modificationTime: info.modificationTime ?? null,
    creationTime: info.creationTime ?? null,
    extension: '',
  };
}

function mapFileInfo(file) {
  const info = file.info();

  return {
    id: file.uri,
    name: file.name || getNameFromUri(file.uri),
    uri: file.uri,
    type: 'file',
    size: info.size ?? file.size ?? 0,
    modificationTime: info.modificationTime ?? file.modificationTime ?? null,
    creationTime: info.creationTime ?? file.creationTime ?? null,
    extension: file.extension ? file.extension.replace('.', '').toLowerCase() : '',
  };
}

function mapItemFromEntry(entry) {
  return entry instanceof Directory ? mapDirectoryInfo(entry) : mapFileInfo(entry);
}

async function calculateDirectorySize(directoryUri) {
  const directory = getDirectory(directoryUri);

  if (!directory.exists) {
    return 0;
  }

  let totalSize = 0;

  for (const child of directory.list()) {
    if (child instanceof Directory) {
      totalSize += await calculateDirectorySize(child.uri);
    } else {
      totalSize += child.size ?? child.info().size ?? 0;
    }
  }

  return totalSize;
}

async function countNestedItems(directoryUri) {
  const directory = getDirectory(directoryUri);

  if (!directory.exists) {
    return { files: 0, directories: 0 };
  }

  let files = 0;
  let directories = 0;

  for (const child of directory.list()) {
    if (child instanceof Directory) {
      directories += 1;
      const nestedItems = await countNestedItems(child.uri);
      files += nestedItems.files;
      directories += nestedItems.directories;
    } else {
      files += 1;
    }
  }

  return { files, directories };
}

async function ensureRootDirectory() {
  const rootDirectory = getDirectory(getRootDirectoryUri());

  if (!rootDirectory.exists) {
    rootDirectory.create({ intermediates: true, idempotent: true });
  }

  return normalizeDirectoryUri(rootDirectory.uri);
}

export async function initializeAppDirectory() {
  return ensureRootDirectory();
}

export async function getRootDirectoryUriAsync() {
  return ensureRootDirectory();
}

export async function listDirectory(uri) {
  const rootDirectoryUri = await ensureRootDirectory();
  const directoryUri = normalizeDirectoryUri(uri);
  const directory = getDirectory(directoryUri);

  if (!directory.exists) {
    throw new Error(strings.service.directoryDoesNotExist);
  }

  const items = directory.list().map(mapItemFromEntry);

  items.sort((left, right) => {
    if (left.type !== right.type) {
      return left.type === 'directory' ? -1 : 1;
    }

    return left.name.localeCompare(right.name);
  });

  const normalizedRootUri = normalizeDirectoryUri(rootDirectoryUri);
  const normalizedDirectoryUri = normalizeDirectoryUri(directory.uri);
  const parentPath =
    normalizedDirectoryUri === normalizedRootUri ? null : normalizeDirectoryUri(directory.parentDirectory.uri);

  return {
    path: normalizedDirectoryUri,
    parentPath,
    items,
  };
}

export async function createFolder(parentUri, folderName) {
  const validationError = validateItemName(folderName);

  if (validationError) {
    throw new Error(validationError);
  }

  const parentDirectory = getDirectory(parentUri);

  if (!parentDirectory.exists) {
    throw new Error(strings.service.parentDirectoryDoesNotExist);
  }

  const targetDirectory = new Directory(parentDirectory, folderName.trim());

  if (targetDirectory.exists) {
    throw new Error(strings.service.folderAlreadyExists);
  }

  targetDirectory.create();
  return mapDirectoryInfo(targetDirectory);
}

export async function createTextFile(parentUri, fileName, content = '') {
  const normalizedName = sanitizeTextFileName(fileName);
  const validationError = validateItemName(normalizedName, { requireTxt: true });

  if (validationError) {
    throw new Error(validationError);
  }

  const parentDirectory = getDirectory(parentUri);

  if (!parentDirectory.exists) {
    throw new Error(strings.service.parentDirectoryDoesNotExist);
  }

  const file = new File(parentDirectory, normalizedName);

  if (file.exists) {
    throw new Error(strings.service.fileAlreadyExists);
  }

  file.create();
  file.write(content ?? '');

  return mapFileInfo(file);
}

export async function readTextFile(uri) {
  const file = getFile(uri);

  if (!file.exists) {
    throw new Error(strings.service.fileDoesNotExist);
  }

  if (!isTxtFile(file.name)) {
    throw new Error(strings.service.onlyTxtOpen);
  }

  return file.text();
}

export async function updateTextFile(uri, content) {
  const file = getFile(uri);

  if (!file.exists) {
    throw new Error(strings.service.fileDoesNotExist);
  }

  if (!isTxtFile(file.name)) {
    throw new Error(strings.service.onlyTxtEdit);
  }

  file.write(content ?? '');
  return mapFileInfo(file);
}

export async function deleteItem(uri, type) {
  if (type === 'directory') {
    const directory = getDirectory(uri);

    if (!directory.exists) {
      throw new Error(strings.service.directoryDoesNotExist);
    }

    directory.delete();
    return;
  }

  const file = getFile(uri);

  if (!file.exists) {
    throw new Error(strings.service.fileDoesNotExist);
  }

  file.delete();
}

export async function getItemDetails(uri, type) {
  if (type === 'directory') {
    const directory = getDirectory(uri);

    if (!directory.exists) {
      throw new Error(strings.service.directoryDoesNotExist);
    }

    const info = directory.info();

    return {
      name: directory.name || getNameFromUri(directory.uri),
      uri: normalizeDirectoryUri(directory.uri),
      typeLabel: strings.service.folderType,
      size: await calculateDirectorySize(directory.uri),
      lastModified: info.modificationTime ?? null,
      createdAt: info.creationTime ?? null,
      extension: strings.common.notAvailable,
      itemsCount: directory.list().length,
    };
  }

  const file = getFile(uri);

  if (!file.exists) {
    throw new Error(strings.service.fileDoesNotExist);
  }

  const info = file.info();

  return {
    name: file.name || getNameFromUri(file.uri),
    uri: file.uri,
    typeLabel: isTxtFile(file.name) ? strings.service.textFileType : strings.service.fileType,
    size: info.size ?? file.size ?? 0,
    lastModified: info.modificationTime ?? file.modificationTime ?? null,
    createdAt: info.creationTime ?? file.creationTime ?? null,
    extension: file.extension ? file.extension.replace('.', '').toLowerCase() : strings.common.notAvailable,
    itemsCount: null,
  };
}

export async function getStorageStats(currentUri) {
  const rootDirectoryUri = await ensureRootDirectory();
  const directoryUri = normalizeDirectoryUri(currentUri || rootDirectoryUri);
  const directoryInfo = getPathInfo(directoryUri);

  if (!directoryInfo.exists || !directoryInfo.isDirectory) {
    throw new Error(strings.service.currentDirectoryDoesNotExist);
  }

  const appRootSize = await calculateDirectorySize(rootDirectoryUri);
  const currentDirectorySize = await calculateDirectorySize(directoryUri);
  const counters = await countNestedItems(rootDirectoryUri);
  const totalSpace = typeof Paths.totalDiskSpace === 'number' ? Paths.totalDiskSpace : null;
  const freeSpace = typeof Paths.availableDiskSpace === 'number' ? Paths.availableDiskSpace : null;
  const usedSpace =
    typeof totalSpace === 'number' && typeof freeSpace === 'number' ? totalSpace - freeSpace : null;

  return {
    totalSpace,
    freeSpace,
    usedSpace,
    appRootSize,
    currentDirectorySize,
    appRootFiles: counters.files,
    appRootDirectories: counters.directories,
    currentPath: directoryUri,
    rootPath: rootDirectoryUri,
  };
}

export { getRootDirectoryUriAsync as getRootDirectoryUri };
