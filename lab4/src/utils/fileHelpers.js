import { strings } from '../constants/strings';

const INVALID_NAME_PATTERN = /[<>:"/\\|?*\u0000-\u001F]/;

export function isTxtFile(name) {
  return /\.txt$/i.test(name);
}

export function sanitizeTextFileName(name) {
  const trimmedName = String(name || '').trim();

  if (!trimmedName) {
    return '';
  }

  return isTxtFile(trimmedName) ? trimmedName : `${trimmedName}.txt`;
}

export function validateItemName(name, options = {}) {
  const { requireTxt = false } = options;
  const normalizedName = String(name || '').trim();

  if (!normalizedName) {
    return strings.validation.nameRequired;
  }

  if (normalizedName === '.' || normalizedName === '..') {
    return strings.validation.reservedNames;
  }

  if (INVALID_NAME_PATTERN.test(normalizedName)) {
    return strings.validation.invalidCharacters;
  }

  if (normalizedName.length > 60) {
    return strings.validation.tooLong;
  }

  if (requireTxt && !isTxtFile(normalizedName)) {
    return strings.validation.onlyTxt;
  }

  return '';
}
