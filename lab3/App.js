import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { useGameState } from './src/hooks/useGameState';

export default function App() {
  const game = useGameState();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={game.theme.isDark ? 'light' : 'dark'} />
        <AppNavigator game={game} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
