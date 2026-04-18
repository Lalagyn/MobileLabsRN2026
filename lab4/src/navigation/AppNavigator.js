import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import FileEditorScreen from '../screens/FileEditorScreen';
import HomeScreen from '../screens/HomeScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import StatsScreen from '../screens/StatsScreen';

enableScreens();

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: strings.navigation.home }} />
      <Stack.Screen name="FileEditor" component={FileEditorScreen} options={{ title: strings.navigation.fileEditor }} />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: strings.navigation.itemDetails }} />
      <Stack.Screen name="Stats" component={StatsScreen} options={{ title: strings.navigation.stats }} />
    </Stack.Navigator>
  );
}
