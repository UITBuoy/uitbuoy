import React from 'react';
import { useColorScheme } from 'react-native';

import { Stack } from 'expo-router';
import { GluestackUIProvider } from '../src/components/gluestack-ui-provider/';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '../global.css';

import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';

import { useApolloLink } from '../src/utils/auth';

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

export default function Layout() {
    const colorScheme = useColorScheme();

    const link = useApolloLink();

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });

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
                            name="login"
                            options={{ headerShown: false }}
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
                    </Stack>
                </ThemeProvider>
            </ApolloProvider>
        </GluestackUIProvider>
    );
}
