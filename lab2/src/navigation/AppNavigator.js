import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawer from '../components/CustomDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function NewsStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{
                    title: 'Стрічка новин',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                            style={{ paddingLeft: 15, paddingRight: 15 }}
                        >
                            <Text style={{ fontSize: 24, color: '#007AFF' }}>☰</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen
                name="Details"
                component={DetailsScreen}
            />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerType: 'front',
                drawerActiveTintColor: '#007AFF',
                drawerLabelStyle: { fontSize: 16 },
            }}
        >
            <Drawer.Screen
                name="NewsStack"
                component={NewsStack}
                options={{ title: 'Новини', headerShown: false }}
            />
            <Drawer.Screen
                name="Contacts"
                component={ContactsScreen}
                options={{ title: 'Контакти' }}
            />
        </Drawer.Navigator>
    );
}