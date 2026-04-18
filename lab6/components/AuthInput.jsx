import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function AuthInput({ label, style, ...props }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={COLORS.placeholder}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  input: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
  },
});
