import { ApolloProvider } from '@apollo/client';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import '../global.css';
import { GluestackUIProvider } from '../src/components/gluestack-ui-provider/';
import { useCustomApolloClient } from '../src/hooks/config/useApolloClient';
import { useConfigGoogle } from '../src/hooks/config/useConfigGoogle';
import { useConfigPushNotification } from '../src/hooks/config/useConfigPushNotification';

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

export default function Layout() {
    const client = useCustomApolloClient();

    useConfigGoogle();
    useConfigPushNotification();

    const colorScheme = useColorScheme();

    return (
        <GluestackUIProvider>
            <ApolloProvider client={client}>
                <ThemeProvider
                    value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
                >
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false,
                                animation: 'slide_from_right',
                            }}
                        />
                        <Stack.Screen
                            name="modals/login"
                            options={{
                                headerShown: false,
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                            }}
                        />
                        <Stack.Screen
                            name="modals/courseSearch"
                            options={{
                                headerShown: false,
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                            }}
                        />
                        <Stack.Screen
                            name="modals/courseDetail"
                            options={{
                                title: 'Detail course',
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                                headerShadowVisible: false,
                                headerStyle: { backgroundColor: '#039CCA' },
                                headerTintColor: 'white',
                                headerTitleStyle: { fontSize: 16 },
                            }}
                        />
                        <Stack.Screen
                            name="modals/detail-activity"
                            options={{
                                title: 'Activity',
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                                headerShadowVisible: false,
                                headerStyle: { backgroundColor: 'white' },
                                headerTintColor: 'black',
                                headerTitleStyle: { fontSize: 16 },
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="modals/detail-folder"
                            options={{
                                title: 'Folder',
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                                headerShadowVisible: false,
                                headerStyle: { backgroundColor: 'white' },
                                headerTintColor: 'black',
                                headerTitleStyle: { fontSize: 16 },
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="modals/google-integration"
                            options={{
                                title: 'Google integration',
                                presentation: 'modal',
                                animation: 'fade_from_bottom',
                                headerShadowVisible: false,
                                headerStyle: { backgroundColor: 'white' },
                                headerTintColor: 'black',
                                headerTitleStyle: { fontSize: 16 },
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="modals/notification-config"
                            options={{
                                title: 'Cài đặt thông báo',
                                presentation: 'modal',
                                animation: 'slide_from_right',
                                headerShadowVisible: true,
                                headerStyle: { backgroundColor: 'white' },
                                headerTintColor: 'black',
                                headerTitleStyle: { fontSize: 16 },
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="modals/makeup-classes"
                            options={{
                                title: 'Các lớp học bù',
                                presentation: 'modal',
                                animation: 'slide_from_left',
                                headerShadowVisible: true,
                                headerStyle: { backgroundColor: 'white' },
                                headerTintColor: 'black',
                                headerTitleStyle: { fontSize: 16 },
                                headerTitleAlign: 'center',
                            }}
                        />
                        <Stack.Screen
                            name="modals/sign-in-resolve"
                            options={{
                                headerShown: false,
                                presentation: 'modal',
                                animation: 'slide_from_right',
                            }}
                        />
                    </Stack>
                </ThemeProvider>
            </ApolloProvider>
        </GluestackUIProvider>
    );
}
