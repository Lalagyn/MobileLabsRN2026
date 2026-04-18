import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';

export default function ScreenContainer({ children, style, contentContainerStyle }) {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <View style={[styles.content, contentContainerStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
});
