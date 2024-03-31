import React from 'react';
import { Text, useColorScheme } from 'react-native';

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
import { AuthEntity } from '../src/gql/graphql';

import { jwtDecode } from 'jwt-decode';
import { useApolloLink } from '../src/utils/auth';

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

export default function Layout() {
    const colorScheme = useColorScheme();

    const {
        authData: { access_token, refresh_token },
    } = useAuth();

    let client;

    // const authLink = setContext((_, { headers }) => {
    //     const decodedAccessToken = jwtDecode(access_token);
    //     const decodedRefreshToken = jwtDecode(refresh_token);

    //     const now = new Date().getTime() / 1000;

    //     let token = access_token;

    //     if (decodedAccessToken.exp >= now) {
    //         token = refresh_token;
    //     }

    //     return {
    //         headers: {
    //             ...headers,
    //             authorization: token ? `Bearer ${token}` : '',
    //         },
    //     };
    // });

    const link = useApolloLink();

    client = new ApolloClient({
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
                    </Stack>
                </ThemeProvider>
            </ApolloProvider>
        </GluestackUIProvider>
    );
}
