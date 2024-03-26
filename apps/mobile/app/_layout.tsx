import React from 'react';
import { useColorScheme } from 'react-native';

import { Stack } from 'expo-router';
import { GluestackUIProvider } from '../src/components/gluestack-ui-provider/';

import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import '../global.css';

import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { setContext } from '@apollo/client/link/context';
import { useAuth } from '../src/stores/auth.store';

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

export default function Layout() {
    const colorScheme = useColorScheme();

    const {
        authData: { access_token },
    } = useAuth();

    const link = createHttpLink({
        uri: 'http://192.168.1.4:3001/graphql',
        credentials: 'same-origin',
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: access_token ? `Bearer ${access_token}` : '',
            },
        };
    });

    const client = new ApolloClient({
        // uri: 'http://192.168.1.6:3001/graphql',
        link: authLink.concat(link),
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
                    </Stack>
                </ThemeProvider>
            </ApolloProvider>
        </GluestackUIProvider>
    );
}
