import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator({ game }) {
  const navigationTheme = {
    ...(game.theme.isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(game.theme.isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: game.theme.colors.background,
      card: game.theme.colors.tabBar,
      text: game.theme.colors.text,
      border: game.theme.colors.border,
      primary: game.theme.colors.primary,
      notification: game.theme.colors.accent,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: game.theme.colors.tabBar,
            borderTopColor: game.theme.colors.border,
            height: 72,
            paddingTop: 8,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: game.theme.colors.primary,
          tabBarInactiveTintColor: game.theme.colors.textMuted,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
          },
        }}
      >
        <Tab.Screen name="Game" options={{ title: 'Гра' }}>
          {(props) => <HomeScreen {...props} game={game} />}
        </Tab.Screen>
        <Tab.Screen name="Tasks" options={{ title: 'Завдання' }}>
          {(props) => <TasksScreen {...props} game={game} />}
        </Tab.Screen>
        <Tab.Screen name="Settings" options={{ title: 'Налаштування' }}>
          {(props) => <SettingsScreen {...props} game={game} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
