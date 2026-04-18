export function formatBytes(value) {
  if (typeof value !== 'number' || Number.isNaN(value) || value < 0) {
    return 'N/A';
  }

  if (value === 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const unitIndex = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  const normalizedValue = value / 1024 ** unitIndex;
  const decimals = normalizedValue >= 10 || unitIndex === 0 ? 0 : 1;

  return `${normalizedValue.toFixed(decimals)} ${units[unitIndex]}`;
}

export function formatDate(timestamp) {
  if (!timestamp) {
    return 'N/A';
  }

  const milliseconds = timestamp < 10_000_000_000 ? timestamp * 1000 : timestamp;
  const date = new Date(milliseconds);

  if (Number.isNaN(date.getTime())) {
    return 'N/A';
  }

  return date.toLocaleString();
}

export function shortenUri(uri, maxLength = 72) {
  if (!uri) {
    return '';
  }

  if (uri.length <= maxLength) {
    return uri;
  }

  const visiblePart = Math.max(12, Math.floor((maxLength - 3) / 2));
  return `${uri.slice(0, visiblePart)}...${uri.slice(-visiblePart)}`;
}
