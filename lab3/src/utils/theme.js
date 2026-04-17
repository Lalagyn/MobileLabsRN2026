export const palette = {
  light: {
    background: '#f6efe4',
    surface: '#fffaf2',
    surfaceAlt: '#efe2cf',
    text: '#1d1b18',
    textMuted: '#6e655b',
    primary: '#d2691e',
    primarySoft: '#f7c693',
    accent: '#1c8c74',
    accentSoft: '#b7eadf',
    success: '#1f8f5f',
    danger: '#b44731',
    border: '#dccbb8',
    shadow: '#3a27151f',
    tabBar: '#fff6eb',
  },
  dark: {
    background: '#141414',
    surface: '#212121',
    surfaceAlt: '#303030',
    text: '#f5f1ea',
    textMuted: '#bdb1a3',
    primary: '#ff9d42',
    primarySoft: '#55361a',
    accent: '#58cdb9',
    accentSoft: '#183e38',
    success: '#67d7a5',
    danger: '#ff8e75',
    border: '#403a34',
    shadow: '#0000004d',
    tabBar: '#1a1a1a',
  },
};

export const getTheme = (isDark) => ({
  isDark,
  colors: isDark ? palette.dark : palette.light,
});
