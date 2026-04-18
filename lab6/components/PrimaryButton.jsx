import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/colors';

const variants = {
  primary: {
    backgroundColor: COLORS.primary,
    textColor: COLORS.white,
    borderColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.white,
    textColor: COLORS.text,
    borderColor: COLORS.border,
  },
  danger: {
    backgroundColor: COLORS.danger,
    textColor: COLORS.white,
    borderColor: COLORS.danger,
  },
};

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
}) {
  const palette = variants[variant] ?? variants.primary;
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor,
          opacity: isDisabled ? 0.6 : pressed ? 0.9 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.textColor} />
      ) : (
        <Text style={[styles.title, { color: palette.textColor }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
